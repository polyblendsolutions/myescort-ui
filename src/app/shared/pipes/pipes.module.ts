import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlCustomPipe } from './safe-html.pipe';
import { RouterModule } from '@angular/router';
import {NumMinDigitPipe} from './num-min-digit.pipe';



@NgModule({
  declarations: [
    SafeHtmlCustomPipe,
    NumMinDigitPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SafeHtmlCustomPipe,
    NumMinDigitPipe
  ]
})
export class PipesModule {
}
