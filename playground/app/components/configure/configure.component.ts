import { Component, Inject } from '@angular/core';
import { DrawerRef, DRAWER_DATA } from '@firestitch/drawer';


@Component({
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent {
  public config;

  constructor(public drawer: DrawerRef<ConfigureComponent>,
              @Inject(DRAWER_DATA) public data) {
    this.config = data.config;
  }

  reload() {
    this.data.example.reload();
  }
}
