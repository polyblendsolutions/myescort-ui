import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/common/product-list.service';
import { Product } from '../../../interfaces/common/product.interface';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/common/product.service';
import { FilterData } from '../../../interfaces/core/filter-data';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../interfaces/core/pagination';

@Component({
  selector: 'app-product-list-right',
  templateUrl: './product-list-right.component.html',
  styleUrls: ['./product-list-right.component.scss'],
})
export class ProductListRightComponent implements OnInit {
  //Store data
  products: Product[] = [];
  productData: Product[] = [];
  filter: any = null;
  searchQuery: string = null;
  areaData: any;
  divisionData: any;
  zoneData: any;
  filterValue: any;

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
  selectedZone: string[] = [];
  selectedArea: string[] = [];
  categoryFilterArray: any[] = [];
  typeFilterArray: any[] = [];
  divisionFilterArray: any[] = [];
  areaFilterArray: any[] = [];
  zoneFilterArray: any[] = [];
  selectedintimateHairs: string[] = [];
  selectedHairColors: string[] = [];
  selectedBodyTypes: string[] = [];
  selectedOrientations: string[] = [];
  intimateHairsFilterArray: any[] = [];
  bodyTypesFilterArray: any[] = [];
  orientationsFilterArray: any[] = [];
  hairColorsFilterArray: any[] = [];
  selectedHeight: string;
  heightFilterArray: any[] = [];
  selectedWeight: string;
  weightFilterArray: any[] = [];
  selectedAge: string;
  ageFilterArray: any[] = [];
  // Subscriptions
  private subRouteOne: Subscription;
  private subDataOne: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private _productList: ProductListService
  ) {}

  ngOnInit(): void {
    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe((qParam) => {
      // this.location = qParam['category'];
      this.divisionData = qParam['divisions'];
      this.areaData = qParam['area'];
      this.zoneData = qParam['zone'];
      // this.filterValue = this.divisionData;
      // this.filterValue = this.areaData;
      // this.filterValue = this.zoneData;
      // console.log('this.location',this.location)

      

      if (Object.values(qParam).length !== 0) {
        // Search Query
        this.searchQueryFromQueryParam(qParam);

        // Filter Query
        this.filterQueryFromQueryParam(qParam);
      }

      // Fetch data
      this.getAllProducts();
      this.getAllProduct();
    });
  }

  /**
   * QUERY BUILDER
   * filterQueryFromQueryParam()
   */

  private searchQueryFromQueryParam(qParam: any) {
    if (qParam && qParam['searchQuery']) {
      this.searchQuery = qParam['searchQuery'];
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

    if (qParam && qParam['area']) {
      if (typeof qParam['area'] === 'string') {
        this.selectedArea = [qParam['area']];
      } else {
        this.selectedArea = qParam['area'];
      }
      this.areaFilterArray = this.selectedArea.map((m) => {
        return { 'area.name': m };
      });
    }

    if (qParam && qParam['zone']) {
      if (typeof qParam['zone'] === 'string') {
        this.selectedZone = [qParam['zone']];
      } else {
        this.selectedZone = qParam['zone'];
      }
      this.zoneFilterArray = this.selectedZone.map((m) => {
        return { 'zone.name': m };
      });
    }
    if (qParam && qParam['height']) {
      if (typeof qParam['height'] === 'string') {
        this.selectedHeight = qParam['height'];
      } else {
        this.selectedHeight = qParam['height'];
      }
      const [minHeight, maxHeight] = this.selectedHeight.split('-').map(Number);

      this.heightFilterArray = [
        {
          height: {
            $lte: maxHeight,
            $gte: minHeight,
          },
        },
      ];
    }
    if (qParam && qParam['weight']) {
      if (typeof qParam['weight'] === 'string') {
        this.selectedWeight = qParam['weight'];
      } else {
        this.selectedWeight = qParam['weight'];
      }
      const [minWeight, maxWeight] = this.selectedWeight.split('-').map(Number);

      this.weightFilterArray = [
        {
          weight: {
            $lte: maxWeight,
            $gte: minWeight,
          },
        },
      ];
    }
    if (qParam && qParam['age']) {
      if (typeof qParam['age'] === 'string') {
        this.selectedAge = qParam['age'];
      } else {
        this.selectedAge = qParam['age'];
      }
      const [minAge, maxAge] = this.selectedAge.split('-').map(Number);

      this.ageFilterArray = [
        {
          age: {
            $lte: maxAge.toString(),
            $gte: minAge.toString(),
          },
        },
      ];
    }
    return []; // Default return statement
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
      user: 1,
      costPrice: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      hasVariations: 1,
      status: 1,
      videoUrl: 1,
      ratingTotal: 1,
      ratingCount: 1,
      type: 1,
      title: 1,
      age: 1,
      isVerfied: 1,
      division: 1,
      area: 1,
      zone: 1,
    };

    // Compleax Filter Array Based on Selections
    const comFilter = { status: 'publish' };
    if (this.categoryFilterArray.length) {
      // comFilter.push({ $or: this.categoryFilterArray });
      // comFilter.push(this.categoryFilterArray);

      comFilter[Object.keys(this.divisionFilterArray[0])[0]] = Object.values(this.divisionFilterArray[0])[0];
    }

    if (this.typeFilterArray.length) {
      // comFilter.push({ $or: this.typeFilterArray });
      // comFilter.push(this.typeFilterArray);
      comFilter[Object.keys(this.typeFilterArray[0])[0]] = Object.values(this.typeFilterArray[0])[0];
    }

    if (this.intimateHairsFilterArray.length) {
      // comFilter.push({ $or: this.intimateHairsFilterArray });
      // comFilter.push(this.intimateHairsFilterArray);
      comFilter[Object.keys(this.intimateHairsFilterArray[0])[0]] = Object.values(this.intimateHairsFilterArray[0])[0];
    }

    if (this.bodyTypesFilterArray.length) {
      // comFilter.push({ $or: this.bodyTypesFilterArray });
      // comFilter.push(this.bodyTypesFilterArray);
      comFilter[Object.keys(this.bodyTypesFilterArray[0])[0]] = Object.values(this.bodyTypesFilterArray[0])[0];
    }

    if (this.hairColorsFilterArray.length) {
      // comFilter.push({ $or: this.hairColorsFilterArray });
      // comFilter.push(this.hairColorsFilterArray);
      comFilter[Object.keys(this.hairColorsFilterArray[0])[0]] = Object.values(this.hairColorsFilterArray[0])[0];
    }

    if (this.orientationsFilterArray.length) {
      // comFilter.push({ $or: this.orientationsFilterArray });
      // comFilter.push(this.orientationsFilterArray);
      comFilter[Object.keys(this.orientationsFilterArray[0])[0]] = Object.values(this.orientationsFilterArray[0])[0];
    }

    if (this.divisionFilterArray.length) {
      // comFilter.push({ $or: this.divisionFilterArray });
      // comFilter.push(this.divisionFilterArray[0]);
      comFilter[Object.keys(this.divisionFilterArray[0])[0]] = Object.values(this.divisionFilterArray[0])[0];
    }

    if (this.areaFilterArray.length) {
      // comFilter.push({ $or: this.areaFilterArray });
      // comFilter.push(this.areaFilterArray);
      comFilter[Object.keys(this.areaFilterArray[0])[0]] = Object.values(this.areaFilterArray[0])[0];
    }

    if (this.zoneFilterArray.length) {
      // comFilter.push({ $or: this.zoneFilterArray });
      // comFilter.push(this.zoneFilterArray);
      comFilter[Object.keys(this.zoneFilterArray[0])[0]] = Object.values(this.zoneFilterArray[0])[0];
    }
    if (this.heightFilterArray.length) {
      // comFilter.push({ $or: this.heightFilterArray });
      // comFilter.push(this.heightFilterArray);
      comFilter[Object.keys(this.heightFilterArray[0])[0]] = Object.values(this.heightFilterArray[0])[0];
    }
    if (this.weightFilterArray.length) {
      // comFilter.push({ $or: this.weightFilterArray });
      // comFilter.push(this.weightFilterArray);
      comFilter[Object.keys(this.weightFilterArray[0])[0]] = Object.values(this.weightFilterArray[0])[0];
    }
    if (this.ageFilterArray.length) {
      // comFilter.push({ $or: this.ageFilterArray });
      // comFilter.push(this.ageFilterArray);
      comFilter[Object.keys(this.ageFilterArray[0])[0]] = Object.values(this.ageFilterArray[0])[0];
    }
    let mFilter;
    if (Object.keys(comFilter).length && Object.keys(comFilter).length > 0) {
      mFilter = {
        ...this.filter,
        ...comFilter,
      };
    } else {
      mFilter = this.filter;
    }

    debugger;
    const filterData: FilterData = {
      pagination: pagination,
      filter: mFilter,
      filterGroup: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productService
      .getAllProducts(filterData, this.searchQuery)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.isLoadMore = false;
          this.categoryFilterArray = [];
          this.typeFilterArray = [];
          this.divisionFilterArray = [];
          this.areaFilterArray = [];
          this.zoneFilterArray = [];
          this.intimateHairsFilterArray = [];
          this.bodyTypesFilterArray = [];
          this.orientationsFilterArray = [];
          this.hairColorsFilterArray = [];
          this.heightFilterArray = [];
          this.weightFilterArray = [];
          this.ageFilterArray = [];
          if (loadMore) {
            this.products = [...this.products, ...res.data];
          } else {
            this.products = res.data;
          }

          this.totalProducts = res.count;
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  private getAllProduct() {
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
      hasVariations: 1,
      status: 1,
      videoUrl: 1,
      ratingTotal: 1,
      ratingCount: 1,
      isRegion: 1,
      type: 1,
      isVerfied: 1,
      user: 1,
      title: 1,
      age: 1,
      division: 1,
    };

    const filterData: FilterData = {
      pagination: pagination,
      filter: { isRegion: true, status: 'publish' },
      filterGroup: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productService
      .getAllProducts(filterData, this.searchQuery)
      .subscribe(
        (res) => {
          this.productData = res.data;
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
}
