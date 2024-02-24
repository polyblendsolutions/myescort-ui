import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/common/product.interface';

@Component({
  selector: 'app-product-details-info',
  templateUrl: './product-details-info.component.html',
  styleUrls: ['./product-details-info.component.scss']
})
export class ProductDetailsInfoComponent {
  @Input() product:Product;
}
