import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { FsTestComponentComponent } from './components/fs-test-component';
import { FsTestService } from './services/fs-test.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsTestComponentComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsTestComponentComponent,
  ],
  providers: [
    FsTestService,
  ],
})
export class FsTestModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsTestModule,
      providers: [FsTestService]
    };
  }
}
