import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsComponentModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsComponentExampleComponent } from './app/components/fs-component-example/fs-component-example.component';
import { FsComponentExamplesComponent } from './app/components/fs-component-examples/fs-component-examples.component';
import { InputSingleComponent } from './app/components/input-single/input-single.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsComponentModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FsComponentExampleComponent,
    FsComponentExamplesComponent,
    InputSingleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
