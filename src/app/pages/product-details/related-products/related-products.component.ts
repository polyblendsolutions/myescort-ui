import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/common/product.interface';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent {
  @Input() products:Product[];
}
