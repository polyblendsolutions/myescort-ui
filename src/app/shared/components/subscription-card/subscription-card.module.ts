import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscriptionCardComponent } from './subscription-card.component';

@NgModule({
  declarations: [SubscriptionCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [SubscriptionCardComponent],
})
export class SubscriptionCardModule {}
