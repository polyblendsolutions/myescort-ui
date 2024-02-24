import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  /**
 * Product list left menu responsive.
 * product-list left menu computer view bing nad small.
*/
  productListFilterArea = new BehaviorSubject<boolean>(false);
  headerProductCategoryBarShow = new BehaviorSubject<boolean>(false);

  filterAreaShown: boolean = false;
  computerAreaShown: boolean = false;

  constructor() { }

  /**
   Product list left menu responsive.
   * onFilterAreaShown();
  */
  onFilterAreaShown() {
    this.filterAreaShown = !this.filterAreaShown;
    this.productListFilterArea.next(this.filterAreaShown);
  }
}
