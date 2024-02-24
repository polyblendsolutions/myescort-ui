import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Pagination } from 'src/app/interfaces/core/pagination';
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-app-product-area',
  templateUrl: './app-product-area.component.html',
  styleUrls: ['./app-product-area.component.scss']
})
export class AppProductAreaComponent implements OnInit, OnDestroy {

  // FilterData
  @Input() title: string = 'Our Products';
  @Input() description: string = '';
  @Input() filter: any = null;
  @Input() pagination: Pagination = null;
  products: Product[] = [];

  // Subscriptions
  private subDataOne: Subscription;


  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    // Reload
    this.getAllProduct();
  }

  private getAllProduct() {
    // Select
    const mSelect = {
      image: 1,
      title: 1,
      slug: 1,
      images: 1,
      shortDescription: 1,
      name:1,
      age:1,
      user: 1,
      createdAt: 1,
      division: 1,
    };

    const filter: FilterData = {
      filter: { ...this.filter, ...{ status: 'publish' } },
      pagination: this.pagination,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productService
      .getAllProducts(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.data;
            console.log("this.products4222",this.products);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
