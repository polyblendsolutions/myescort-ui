import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/common/product.interface';

@Component({
  selector: 'app-app-marketplace-card-two',
  templateUrl: './app-marketplace-card-two.component.html',
  styleUrls: ['./app-marketplace-card-two.component.scss'],
})
export class AppMarketplaceCardTwoComponent {
  @Input() data?: Product;

  ngOnInit() {
    console.log(this.data);
  }
}
