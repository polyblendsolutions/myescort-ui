import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SubscriptionDetails } from 'src/app/interfaces/common/subscription.interface';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
})
export class SubscriptionCardComponent {
  @Input() subscriptionData: SubscriptionDetails;
  @Output() buyVIPEvent: EventEmitter<string> = new EventEmitter<string>();

  buyVip(id: string) {
    this.buyVIPEvent.emit(id);
  }
  
  calculatePricePerDay(): string {
    const price: number = parseFloat(this.subscriptionData?.price);
    const days: number = parseFloat(this.subscriptionData?.days);
    
    if (isNaN(price) || isNaN(days) || days === 0) {
      return 'Pris ikke tilgængelig';
    }
  
    const pricePerDay = price / days;
    return pricePerDay.toFixed(2) + ' DKK Pr. Dag';
  }
  
  }
