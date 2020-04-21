import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsTruncateComponent } from './components/truncate/truncate.component';


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
  static forRoot(): ModuleWithProviders<FsTruncateModule> {
    return {
      ngModule: FsTruncateModule
    };
  }
}
