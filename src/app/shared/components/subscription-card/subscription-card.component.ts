import { Component, Input, Output, EventEmitter } from '@angular/core';
import { subscriptionDetail } from 'src/app/interfaces/common/subscription.interface';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
})
export class SubscriptionCardComponent {
  @Input() subscriptionData: subscriptionDetail;
  @Output() buyVIPEvent: EventEmitter<string> = new EventEmitter<string>();

  buyVip(id: string) {
    this.buyVIPEvent.emit(id);
  }
}
