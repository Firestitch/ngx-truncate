import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

import { FsTruncateModule } from '@firestitch/package';

import { AppMaterialModule } from './material.module';
import {
  KitchenSinkComponent,
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { ConfigureComponent } from './components/configure';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FsTruncateModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        FsExampleModule.forRoot(),
        FsMessageModule.forRoot(),
        ToastrModule.forRoot({ preventDuplicates: true }),
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    declarations: [
        AppComponent,
        ExamplesComponent,
        KitchenSinkComponent,
        ConfigureComponent
    ],
    providers: []
})
export class PlaygroundModule {
}
