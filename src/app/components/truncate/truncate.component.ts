import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'fs-truncate',
  templateUrl: 'truncate.component.html',
  styleUrls: [ 'truncate.component.scss' ],
})
export class FsTruncateComponent {

  @Input() lines = 1;

  public truncate = true;

  more() {
    this.truncate = false;
  }

  less() {
    this.truncate = true;
  }
}
