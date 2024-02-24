import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { ProductService } from 'src/app/services/common/product.service';
import { ReloadService } from 'src/app/services/core/reload.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
})
export class MyListComponent {
  products: Product[] = [];

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private productService: ProductService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.reloadService.refreshData$.subscribe(() => {
      this.getAllProduct();
    });
    // Reload
    this.getAllProduct();
  }

  private getAllProduct() {
    // Select
    const mSelect = {
      image: 1,
      title: 1,
      name: 1,
      images: 1,
      age: 1,
      createdAt: 1,
      publisher: 1,
      author: 1,
      brand: 1,
      costPrice: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      quantity: 1,
      category: 1,
      subCategory: 1,
      unit: 1,
      user: 1,
      status: 1,
      threeMonth: 1,
      sixMonth: 1,
      twelveMonth: 1,
      username: 1,
      address: 1,
      division: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productService
      .getAllProductsByUser(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.data;
            console.log(this.products);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
