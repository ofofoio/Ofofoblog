import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './services/services.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceModule
  ],
  exports: []
})
export class SharedModule { }
