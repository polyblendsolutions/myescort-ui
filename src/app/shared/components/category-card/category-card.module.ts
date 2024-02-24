import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    CategoryCardComponent
  ]
})
export class CategoryCardModule { }
