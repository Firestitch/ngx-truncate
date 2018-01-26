import { Component } from '@angular/core';
import { FsTestService } from '../../src';


@Component({
  selector: 'fs-app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ '../styles/styles.scss' ]
})
export class AppComponent {

  constructor(private _test: FsTestService) {
    _test.sayHello();
  }

}
