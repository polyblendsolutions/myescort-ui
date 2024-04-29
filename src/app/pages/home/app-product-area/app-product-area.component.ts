import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  searchQuery: string;

  // Subscriptions
  private loadFilteredProductsSubscription: Subscription;
  private searchQuerySubscription: Subscription;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // // Reload
    // this.getAllProduct();

    this.searchQuerySubscription = this.activatedRoute.queryParams.subscribe(qParam => {
      // this.id = qParam['id'];
      // this.categorySlug = qParam['category'];

      this.searchQueryFromQueryParam(qParam);
      this.getAllProduct();

      // if (this.id && this.categorySlug) {
      //   this.getSingleCategoryById();
      // }
      // if (this.id && this.brandSlug) {
      //   this.getSingleBrandById()
      // }

    });
  }

  private searchQueryFromQueryParam(qParam: any) {
    if (qParam && qParam['searchQuery']) {
      this.searchQuery = qParam['searchQuery'];
    } else {
      this.searchQuery = null;
    }
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
      zone: 1,
    };

    const filter: FilterData = {
      filter: { ...this.filter, ...{ status: 'publish' } },
      pagination: this.pagination,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.loadFilteredProductsSubscription = this.productService
      .getAllProducts(filter, this.searchQuery)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.data;
            this.products.forEach(product => {
              product.images = product.images.map(path => path.replace('images', 'preview'))
            })
            console.log("this.products4222", this.products);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy() {
    if (this.loadFilteredProductsSubscription) {
      this.loadFilteredProductsSubscription.unsubscribe();
    }
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

}
