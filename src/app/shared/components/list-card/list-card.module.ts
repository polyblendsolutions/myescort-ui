import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListCardComponent } from './list-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ListCardComponent
  ]
})
export class ListCardModule { }
