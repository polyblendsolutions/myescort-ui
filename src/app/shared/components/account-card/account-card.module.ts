import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountCardComponent } from './account-card.component';



@NgModule({
  declarations: [
    AccountCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AccountCardComponent
  ]
})
export class AccountCardModule { }
