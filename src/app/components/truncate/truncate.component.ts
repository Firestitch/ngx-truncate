import {  Component, Input, ViewChild, ElementRef, AfterContentInit,
          EventEmitter, Output, OnInit, OnDestroy, HostBinding, NgZone, ApplicationRef, ɵConsole } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'fs-truncate',
  templateUrl: 'truncate.component.html',
  styleUrls: [ 'truncate.component.scss' ],
})
export class FsTruncateComponent implements AfterContentInit, OnDestroy, OnInit {

  @ViewChild('contentEl') contentEl: ElementRef;
  @ViewChild('contentWrapper') contentWrapper: ElementRef;

  @HostBinding('class.truncated') truncated = false;

  @Output() public readonly contentChanged = new EventEmitter();

  @Input() lines = 1;
  @Input() more = false;
  @Input() tooltip = true;

  public content = '';
  public truncate = true;

  private _mutationObserver: MutationObserver;
  private _destroy$ = new Subject();

  constructor() {}

  moreClick() {
    this.truncate = false;
  }

  lessClick() {
    this.truncate = true;
    setTimeout(() => {
      this.calculateTruncated();
    });
  }

  calculateTruncated() {
    const element = this.contentEl.nativeElement;
    // Sometimes because of line-height and font-size % there could could be a difference in height
    this.truncated = (element.scrollHeight / element.clientHeight) >= 1.2;
  }

  ngOnInit() {
    this.contentChanged
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      this.content = this.contentEl.nativeElement.innerHTML;
      this.calculateTruncated();
    });
  }

  ngAfterContentInit(): void {

    this.contentChanged.emit();

    this._mutationObserver = new MutationObserver(() => {
      this.contentChanged.emit();
    });

    const config = { attributes: false, childList: true, characterData: true, subtree: true };
    this._mutationObserver.observe(this.contentEl.nativeElement, config);
  }

  ngOnDestroy(): void {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }
}
