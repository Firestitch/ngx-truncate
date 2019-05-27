import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsTruncateComponent } from './components/truncate/truncate.component';
import { MatTooltipModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule
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
