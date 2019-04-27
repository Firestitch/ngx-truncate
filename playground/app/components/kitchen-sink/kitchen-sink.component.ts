import { Component } from '@angular/core';
import { ConfigureComponent } from '../configure';
import { FsExampleComponent } from '@firestitch/example';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  public config = {};

  constructor(private exampleComponent: FsExampleComponent) {
    //exampleComponent.setConfigureComponent(ConfigureComponent, { config: this.config });
  }
}
