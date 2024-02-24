import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/common/product.interface';

@Component({
  selector: 'app-product-details-pricing',
  templateUrl: './product-details-pricing.component.html',
  styleUrls: ['./product-details-pricing.component.scss']
})
export class ProductDetailsPricingComponent {

  @Input() product:Product;

}
