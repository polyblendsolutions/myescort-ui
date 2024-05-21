import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/common/product-list.service';
import { Product } from '../../../interfaces/common/product.interface';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/common/product.service';
import { FilterData } from '../../../interfaces/core/filter-data';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../../../interfaces/core/pagination';
import { spotPageDetails } from 'src/app/interfaces/common/spot.interface';

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent implements OnInit, OnDestroy {
  @Input() pageData: spotPageDetails;
  //Store data
  products: Product[] = [];
  tagProducts: Product[] = [];
  filter: any = null;
  searchQuery: string = null;

  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 12;
  totalProductsStore = 0;

  isLoading = false;
  isLoadMore = false;

  // Complex Filter
  selectedCategories: string[] = [];
  selectedTypes: string[] = [];
  selectedDivision: string[] = [];
  categoryFilterArray: any[] = [];
  typeFilterArray: any[] = [];
  divisionFilterArray: any[] = [];
  selectedintimateHairs: string[] = [];
  selectedHairColors: string[] = [];
  selectedBodyTypes: string[] = [];
  selectedOrientations: string[] = [];
  intimateHairsFilterArray: any[] = [];
  bodyTypesFilterArray: any[] = [];
  orientationsFilterArray: any[] = [];
  hairColorsFilterArray: any[] = [];
  id:string;
  type:string
  // Subscriptions
  private subRouteOne: Subscription;
  private subProductDetails: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private _productList: ProductListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // GET PAGE FROM QUERY 
    this.type=this.router.url.split('/')[1];
    this.subRouteOne = this.activatedRoute.params.subscribe((qParam) => {
      // Search Query
      this.id = this.activatedRoute.snapshot.params['id'];
      this.searchQueryFromQueryParam(qParam);

      // Filter Query
      this.filterQueryFromQueryParam(qParam);

      // Fetch data
      this.getAllProducts();
    });
  }

  /**
   * QUERY BUILDER
   * filterQueryFromQueryParam()
   */

  private searchQueryFromQueryParam(qParam: any) {
    if (qParam && qParam['search']) {
      this.searchQuery = qParam['search'];
    } else {
      this.searchQuery = null;
    }
  }

  private filterQueryFromQueryParam(qParam: any) {
    if (qParam && qParam['categories']) {
      if (typeof qParam['categories'] === 'string') {
        this.selectedCategories = [qParam['categories']];
      } else {
        this.selectedCategories = qParam['categories'];
      }
      this.categoryFilterArray = this.selectedCategories.map((m) => {
        return { 'category.slug': m };
      });
    }

    if (qParam && qParam['types']) {
      if (typeof qParam['types'] === 'string') {
        this.selectedTypes = [qParam['types']];
      } else {
        this.selectedTypes = qParam['types'];
      }
      this.typeFilterArray = this.selectedTypes.map((m) => {
        return { 'type.slug': m };
      });
    }

    if (qParam && qParam['intimateHairs']) {
      if (typeof qParam['intimateHairs'] === 'string') {
        this.selectedintimateHairs = [qParam['intimateHairs']];
      } else {
        this.selectedintimateHairs = qParam['intimateHairs'];
      }
      this.intimateHairsFilterArray = this.selectedintimateHairs.map((m) => {
        return { 'intimateHair.slug': m };
      });
    }

    if (qParam && qParam['bodyTypes']) {
      if (typeof qParam['bodyTypes'] === 'string') {
        this.selectedBodyTypes = [qParam['bodyTypes']];
      } else {
        this.selectedBodyTypes = qParam['bodyTypes'];
      }
      this.bodyTypesFilterArray = this.selectedBodyTypes.map((m) => {
        return { 'bodyType.slug': m };
      });
    }

    if (qParam && qParam['orientations']) {
      if (typeof qParam['orientations'] === 'string') {
        this.selectedOrientations = [qParam['orientations']];
      } else {
        this.selectedOrientations = qParam['orientations'];
      }
      this.orientationsFilterArray = this.selectedOrientations.map((m) => {
        return { 'orientation.slug': m };
      });
    }

    if (qParam && qParam['hairColors']) {
      if (typeof qParam['hairColors'] === 'string') {
        this.selectedHairColors = [qParam['hairColors']];
      } else {
        this.selectedHairColors = qParam['hairColors'];
      }
      this.orientationsFilterArray = this.selectedHairColors.map((m) => {
        return { 'hairColor.slug': m };
      });
    }

    if (qParam && qParam['divisions']) {
      if (typeof qParam['divisions'] === 'string') {
        this.selectedDivision = [qParam['divisions']];
      } else {
        this.selectedDivision = qParam['divisions'];
      }
      this.divisionFilterArray = this.selectedDivision.map((m) => {
        return { 'division.name': m };
      });
    }
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getAllProducts(loadMore?: boolean) {
    const pagination: Pagination = {
      pageSize: Number(this.productsPerPage),
      currentPage: Number(this.currentPage) - 1,
    };

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      images: 1,
      category: 1,
      subCategory: 1,
      brand: 1,
      costPrice: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      addContent: 1,
      hasVariations: 1,
      verified: 1,
      status: 1,
      videoUrl: 1,
      ratingTotal: 1,
      ratingCount: 1,
      type: 1,
      title: 1,
      division: 1,
      tags: 1,
      description: 1,
      shortDescription: 1,
    };

    // Compleax Filter Array Based on Selections
    const comFilter: any[] = [];
    if (this.categoryFilterArray.length) {
      comFilter.push({ $or: this.categoryFilterArray });
    }

    if (this.typeFilterArray.length) {
      comFilter.push({ $or: this.typeFilterArray });
    }

    if (this.intimateHairsFilterArray.length) {
      comFilter.push({ $or: this.intimateHairsFilterArray });
    }

    if (this.bodyTypesFilterArray.length) {
      comFilter.push({ $or: this.bodyTypesFilterArray });
    }

    if (this.hairColorsFilterArray.length) {
      comFilter.push({ $or: this.hairColorsFilterArray });
    }

    if (this.orientationsFilterArray.length) {
      comFilter.push({ $or: this.orientationsFilterArray });
    }

    if (this.divisionFilterArray.length) {
      comFilter.push({ $or: this.divisionFilterArray });
    }

    let mFilter;
    if (comFilter.length) {
      mFilter = {
        ...this.filter,
        ...{
          $or: comFilter,
        },
      };
    } else {
      mFilter = this.filter;
    }
    const filter: any = {
      ...mFilter,
      'type.slug': this.type,
      status: 'publish'
    };
    // Set dynamic properties
    filter[this.pageData.spotType] = this.capitalizeFirstLetter(this.id);
    
    // Create the filterData object
    const filterData: FilterData = {
      pagination: pagination,
      filter: filter,
      filterGroup: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subProductDetails = this.productService
      .getAllProducts(filterData, this.searchQuery)
      .subscribe(
        (res) => {
          console.log(res);
          this.tagProducts = res.data;

          this.isLoading = false;
          this.isLoadMore = false;
          if (loadMore) {
            this.products = [...this.products, ...this.tagProducts];
          } else {
            this.products = this.tagProducts;
          }

          this.totalProducts = res.count;
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  
  /**
   * LOAD MORE
   */
  onLoadMore() {
    if (this.totalProducts > this.products.length) {
      this.isLoadMore = true;
      this.currentPage += 1;
      this.getAllProducts(true);
    }
  }

  /**
   * PRODUCT LIST LEFT MENU RESPONSIVE
   * onHideFilterArea();
   */
  onHideFilterArea() {
    this._productList.onFilterAreaShown();
  }
  ngOnDestroy(): void {
    if (this.subProductDetails) {
      this.subProductDetails.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  } 
}
