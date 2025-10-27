import { Component, inject } from '@angular/core';
import { DrawerRef, DRAWER_DATA } from '@firestitch/drawer';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss'],
    standalone: true,
    imports: [MatFormField, MatSelect, FormsModule, MatOption, MatInput, CdkTextareaAutosize, MatButton]
})
export class ConfigureComponent {
  drawer = inject<DrawerRef<ConfigureComponent>>(DrawerRef);
  data = inject(DRAWER_DATA);

  public config;

  constructor() {
    const data = this.data;

    this.config = data.config;
  }

  reload() {
    this.data.example.reload();
  }
}
