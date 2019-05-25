import {  Component, Input, ViewChild, ElementRef, AfterContentInit,
          AfterContentChecked, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'fs-truncate',
  templateUrl: 'truncate.component.html',
  styleUrls: [ 'truncate.component.scss' ],
})
export class FsTruncateComponent implements AfterContentInit, AfterContentChecked, OnInit {

  @ViewChild('contentEl') contentEl: ElementRef;

  @Output() public readonly contentChanged = new EventEmitter<string>();

  @Input() lines = 1;
  @Input() more = false;
  @Input() tooltip = true;

  private content = '';
  public truncate = true;
  public truncated = false;

  moreClick() {
    this.truncate = false;
  }

  lessClick() {
    this.truncate = true;
    this.calculateTruncated();
  }

  calculateTruncated() {
    if (this.truncate) {
      setTimeout(() => {
        const element = this.contentEl.nativeElement;
        this.truncated = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
      });
    }
  }

  ngOnInit() {
    this.contentChanged
    .subscribe(() => {
      this.calculateTruncated();
    });
  }

  ngAfterContentInit(): void {
    this.content = this.contentEl.nativeElement.innerHTML;
    this.contentChanged.emit(this.content);
  }

  ngAfterContentChecked(): void {
    const innerHTML = this.contentEl.nativeElement.innerHTML;
    if (innerHTML !== this.content) {
        this.content = innerHTML;
        this.contentChanged.emit(this.content);
    }
  }
}
