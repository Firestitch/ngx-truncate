import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsTruncateComponent } from './components/truncate';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsTruncateComponent,
  ],
  declarations: [
    FsTruncateComponent,
  ],
})
export class FsTruncateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsTruncateModule
    };
  }
}
