import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/common/product.interface';

@Component({
  selector: 'app-select-days',
  templateUrl: './select-days.component.html',
  styleUrls: ['./select-days.component.scss']
})
export class SelectDaysComponent {
  @Input() product:Product;
}
