import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'fs-truncate',
  templateUrl: 'truncate.component.html',
  styleUrls: ['truncate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTruncateComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  @ViewChild('contentEl', { static: true }) public contentEl: ElementRef = null;
  @ViewChild('contentWrapper') public contentWrapper: ElementRef = null;

  @HostBinding('class.truncated') public truncated = false;

  @Output() public readonly contentChanged = new EventEmitter();

  @Input() public lines = 1;
  @Input('more') public moreVisible = false;
  @Input() public tooltip = true;

  public content = '';
  public contentTruncating = false;
  public linesClass = '';

  public showMore = false;
  public showLess = false;

  public tooltipDisabled = true;

  private _mutationObserver: MutationObserver;
  private _destroy$ = new Subject();

  constructor(
    private _zone: NgZone,
    private _cd: ChangeDetectorRef,
  ) { }

  public ngOnInit() {
    this._listenContentChanges();
    this._listenWindowResize();
  }

  public ngAfterContentInit(): void {
    this._zone.runOutsideAngular(() => {
      this._mutationObserver = new MutationObserver(() => {
        this.contentChanged.emit();
      });

      const config = { attributes: false, childList: true, characterData: true, subtree: true };
      this._mutationObserver.observe(this.contentEl.nativeElement, config);
    });

    // Initial calculations
    this._contentUpdated();
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
      this._cd.detectChanges();
    }
  }

  public ngOnDestroy(): void {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggle() {
    if (this.truncated) {
      this.lessClick();
    } else {
      this.moreClick();
    }
  }

  public moreClick() {
    this.truncated = true;
    this.showMore = !this.truncated;
    this.showLess = this.truncated;
  }

  public lessClick() {
    this.truncated = false;
    this.showMore = !this.truncated;
    this.showLess = this.truncated;
  }

  private _listenWindowResize() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._contentUpdated();
      });
  }

  private _listenContentChanges() {
    this.contentChanged
      .pipe(
        debounceTime(200),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._contentUpdated();
        this._cd.markForCheck();
      });
  }

  private _contentUpdated() {
    this.content = this.contentEl.nativeElement.innerHTML;
    this._calculateTruncated();
    this._cd.detectChanges();
  }

  private _calculateTruncated() {
    const element = this.contentEl.nativeElement;
    // Sometimes because of line-height and font-size % there could could be a difference in height
    this.contentTruncating = (element.scrollHeight / element.offsetHeight) > 1;

    this._checkTooltipDisabled();
    this._checkButtonsVisibility();
  }

  private _checkButtonsVisibility() {
    this.showMore = false;
    this.showLess = false;

    if (this.moreVisible) {
      if (this.contentTruncating) {
        this.showMore = true;
        this.showLess = false;
      } else {
        this.showMore = false;
        this.showLess = true;
      }
    }
  }

  private _checkTooltipDisabled() {
    this.tooltipDisabled = !this.truncated || !this.tooltip || this.moreVisible;
  }

}
