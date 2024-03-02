import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';
import { Product } from "../../../interfaces/common/product.interface";
import { FilterData } from "../../../interfaces/core/filter-data";
import { Pagination } from '../../../interfaces/core/pagination';
import { ProductService } from "../../../services/common/product.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-ads-category',
  templateUrl: './all-ads-category.component.html',
  styleUrls: ['./all-ads-category.component.scss']
})
export class AllAdsCategoryComponent implements OnInit, OnDestroy {

  // FilterData
  @Input() title: string = 'Our Products';
  @Input() description: string = '';
  @Input() filter: any = null;
  @Input() pagination: Pagination = null;
  products: Product[] = [];
  filterData: any;
  id: string;
  searchQuery: string;
  categorySlug: string;
  // Subscriptions
  private loadFilteredProductsSubscription: Subscription;
  private searchQuerySubscription: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.searchQuerySubscription = this.activatedRoute.queryParams.subscribe(qParam => {
      this.id = qParam['id'];
      this.categorySlug = qParam['category'];

      this.searchQueryFromQueryParam(qParam);
      this.getAllProduct();

      // if (this.id && this.categorySlug) {
      //   this.getSingleCategoryById();
      // }
      // if (this.id && this.brandSlug) {
      //   this.getSingleBrandById()
      // }

    });

    // Reload
    // this.getAllProduct();
  }

  private searchQueryFromQueryParam(qParam: any) {
    if (qParam && qParam['searchQuery']) {
      this.searchQuery = qParam['searchQuery'];
    } else {
      this.searchQuery = null;
    }
  }

  // private getAllProduct() {
  //   // Select
  //   const mSelect = {
  //     image: 1,
  //     title: 1,
  //     slug: 1,
  //     user:1,
  //     name:1,
  //     images: 1,
  //     shortDescription: 1,
  //     age:1,
  //     verified: 1,
  //     createdAt: 1,
  //     division: 1,
  //   };
  //
  //   const filter: FilterData = {
  //     filter: null,
  //     pagination: this.pagination,
  //     select: mSelect,
  //     sort: { createdAt: -1 },
  //   };
  //
  //   this.subDataOne = this.productService
  //     .getAllProducts(filter, null)
  //     .subscribe({
  //       next: (res) => {
  //         if (res.success) {
  //           if(this.id){
  //             this.products = res.data.filter(f => f.division?._id === this.id);
  //           }else{
  //             this.products = res.data;
  //           }
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }



  private getAllProduct() {
    const mSelect = {
      image: 1,
      title: 1,
      slug: 1,
      user:1,
      name:1,
      images: 1,
      shortDescription: 1,
      age:1,
      verified: 1,
      createdAt: 1,
      division: 1,
    }
    const filterData: FilterData = {
      select: mSelect,
      // filter: {'division._id' : this.id, status: 'publish'},
      filter: {'isFeatured': true, status: 'publish'},
      pagination: { pageSize: 12, currentPage: 0 },
      sort: { createdAt: -1 }
    }

    this.loadFilteredProductsSubscription = this.productService.getAllProducts(filterData, this.searchQuery).subscribe((res) => {
      if (res.success) {

        this.products = res.data;
        console.log("this.products",this.products);
      }
    },
      (err) => {
        if (err) {

          console.log(err);
        }
      }
    )

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
