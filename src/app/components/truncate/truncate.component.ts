import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'fs-truncate',
  templateUrl: 'truncate.component.html',
  styleUrls: ['truncate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTruncateComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  @ViewChild('contentEl') contentEl: ElementRef;
  @ViewChild('contentWrapper') contentWrapper: ElementRef;

  @HostBinding('class.truncated') truncated = false;

  @Output() public readonly contentChanged = new EventEmitter();

  @Input() lines = 1;
  @Input('more') moreVisible = false;
  @Input() tooltip = true;

  public content = '';
  public truncate = true;
  public linesClass = '';

  public moreBtnVisible = false;
  public lessBtnVisible = false;

  public tooltipDisabled = true;

  private _mutationObserver: MutationObserver;
  private _destroy$ = new Subject();

  constructor(private _zone: NgZone) {}

  public ngOnInit() {
    this.contentChanged
      .pipe(
        debounceTime(200),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.content = this.contentEl.nativeElement.innerHTML;
        this._calculateTruncated();
      });
  }

  public ngAfterContentInit(): void {
    this._zone.runOutsideAngular(() => {
      this._mutationObserver = new MutationObserver(() => {
        this.contentChanged.emit();
      });

      const config = { attributes: false, childList: true, characterData: true, subtree: true };
      this._mutationObserver.observe(this.contentEl.nativeElement, config);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.moreVisible || changes.tooltip) {
        this._checkButtonsVisibility();
        this._checkTooltipDisabled();
      }

      if (changes.lines) {
        this.linesClass = 'lines-' + this.lines;
      }
    }
  }

  public ngOnDestroy(): void {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  public moreClick() {
    this.truncate = false;
    this._checkButtonsVisibility();
  }

  public lessClick() {
    this.truncate = true;
    this._checkButtonsVisibility();
    setTimeout(() => {
      this._calculateTruncated();
    });
  }

  private _calculateTruncated() {
    const element = this.contentEl.nativeElement;
    // Sometimes because of line-height and font-size % there could could be a difference in height
    this.truncated = (element.scrollHeight / element.clientHeight) >= 1.2;

    this._checkTooltipDisabled();
  }

  private _checkButtonsVisibility() {
    if (this.moreVisible) {
      if (this.truncate) {
        this.moreBtnVisible = true;
        this.lessBtnVisible = false;
      } else {
        this.moreBtnVisible = false;
        this.lessBtnVisible = true;
      }
    }
  }

  private _checkTooltipDisabled() {
    this.tooltipDisabled = !this.truncated || !this.tooltip || this.moreVisible;
  }
}
