import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from 'src/app/interfaces/common/category.interface';
import {Division} from 'src/app/interfaces/common/division.interface';
import {Type} from 'src/app/interfaces/common/type.interface';
import {FilterData} from 'src/app/interfaces/core/filter-data';
import {CategoryService} from 'src/app/services/common/category.service';
import {DivisionService} from 'src/app/services/common/division.service';
import {ProductListService} from 'src/app/services/common/product-list.service';
import {TypeService} from 'src/app/services/common/type.service';
import {ActivatedRoute, Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";

import {HairColorService} from "../../../../services/common/hairColor.service";
import {IntimateHairService} from "../../../../services/common/intimateHair.service";
import {OrientationService} from "../../../../services/common/orientation.service";
import {BodyTypeService} from "../../../../services/common/bodyType.service";
import {HairColor} from "../../../../interfaces/common/hairColor.interface";
import {BodyType} from "../../../../interfaces/common/bodyType.interface";
import {IntimateHair} from "../../../../interfaces/common/intimateHair.interface";
import {Orientation} from "../../../../interfaces/common/orientation.interface";

@Component({
  selector: 'app-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.scss']
})
export class FilterAreaComponent implements OnInit, OnDestroy {

  // store data
  types: Type[] = [];
  categories: Category[] = [];
  divisions: Division[];
  hairColors: HairColor[] = [];
  bodyTypes: BodyType[] = [];
  intimateHairs: IntimateHair[] = [];
  orientations: Orientation[] = [];
  // Filter Data
  filterArea = false;
  selectedCategories: string[] = [];
  selectedTypes: string[] = [];
  selectedintimateHairs: string[] = [];
  selectedBodyTypes: string[] = [];
  selectedHairColors: string[] = [];
  selectedOrientations: string[] = [];
  selectedDivision: string[] = [];

  // Complex Filter
  categoryFilterArray: any[] = [];
  typeFilterArray: any[] = [];
  intimateHairsFilterArray: any[] = [];
  hairColorsFilterArray: any[] = [];
  bodyTypesFilterArray: any[] = [];
  orientationsFilterArray: any[] = [];
  divisionFilterArray: any[] = [];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subRouteTwo: Subscription;
  private subDataSeven: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;

  constructor(
    private _productList: ProductListService,
    private categoryService: CategoryService,
    private divisionService: DivisionService,
    private hairColorService: HairColorService,
    private intimateHairService: IntimateHairService,
    private orientationService: OrientationService,
    private bodyTypeService: BodyTypeService,
    private typeService: TypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    // This is use for category area mobile responsive.
    this._productList.productListFilterArea.subscribe(
      (res) => {
        this.filterArea = res;
      }
    );

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      // Filter Query
      this.filterQueryFromQueryParam(qParam);
    });

    //Base Data
    this.getAllCategory();
    this.getAllType();
    this.getAllDivision();
    this.getAllHairColor();
    this.getAllIntimateHair();
    this.getAllOrientation();
    this.getAllBodyType();
  }


  private filterQueryFromQueryParam(qParam: any) {
    if (qParam && qParam['categories']) {
      if (typeof qParam['categories'] === 'string') {
        this.selectedCategories = [qParam['categories']];
      } else {
        this.selectedCategories = qParam['categories'];
      }
      this.categoryFilterArray = this.selectedCategories.map(m => {
        return {'category.slug': m}
      });
    }

    if (qParam && qParam['types']) {
      if (typeof qParam['types'] === 'string') {
        this.selectedTypes = [qParam['types']];
      } else {
        this.selectedTypes = qParam['types'];
      }
      this.typeFilterArray = this.selectedTypes.map(m => {
        return {'type.slug': m}
      });

    }

    if (qParam && qParam['bodyTypes']) {
      if (typeof qParam['bodyTypes'] === 'string') {
        this.selectedBodyTypes = [qParam['bodyTypes']];
      } else {
        this.selectedBodyTypes = qParam['bodyTypes'];
      }
      this.bodyTypesFilterArray = this.selectedBodyTypes.map(m => {
        return {'bodyType.slug': m}
      });
    }


    if (qParam && qParam['orientations']) {
      if (typeof qParam['orientations'] === 'string') {
        this.selectedOrientations = [qParam['orientations']];
      } else {
        this.selectedOrientations = qParam['orientations'];
      }
      this.orientationsFilterArray = this.selectedOrientations.map(m => {
        return {'orientation.slug': m}
      });
    }

    if (qParam && qParam['hairColors']) {
      if (typeof qParam['hairColors'] === 'string') {
        this.selectedHairColors = [qParam['hairColors']];
      } else {
        this.selectedHairColors = qParam['hairColors'];
      }
      this.orientationsFilterArray = this.selectedHairColors.map(m => {
        return {'hairColor.slug': m}
      });
    }

    if (qParam && qParam['intimateHairs']) {
      if (typeof qParam['intimateHairs'] === 'string') {
        this.selectedintimateHairs = [qParam['intimateHairs']];
      } else {
        this.selectedintimateHairs = qParam['intimateHairs'];
      }
      this.intimateHairsFilterArray = this.selectedintimateHairs.map(m => {
        return {'intimateHair.slug': m}
      });
    }

    if (qParam && qParam['divisions']) {
      if (typeof qParam['divisions'] === 'string') {
        this.selectedDivision = [qParam['divisions']];
      } else {
        this.selectedDivision = qParam['divisions'];
      }
      this.divisionFilterArray = this.selectedDivision.map(m => {
        return {'division.name': m}
      });
    }

  }


  /**
   * COMPLEX FILTER METHODS
   * onCheckChange()
   * onPriceRangeChange()
   */
  onCheckChange(event: MatCheckboxChange, type: string, index: number) {
    switch (type) {
      case 'category': {
        const data = this.categories[index];
        if (event.checked) {
          this.categoryFilterArray.push({'category.slug': data.slug});
        } else {
          const fIndex = this.categoryFilterArray.findIndex(f => f['category.slug'] === data.slug);
          this.categoryFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const categories = this.categoryFilterArray.map(m => m['category.slug']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {categories: categories}, queryParamsHandling: 'merge'}
        );

        break;
      }
      case 'type': {
        const data = this.types[index];
        if (event.checked) {
          this.typeFilterArray.push({'type.slug': data.slug});
        } else {
          const fIndex = this.typeFilterArray.findIndex(f => f['type.slug'] === data.slug);
          this.typeFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const types = this.typeFilterArray.map(m => m['type.slug']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {types: types}, queryParamsHandling: 'merge'}
        );

        break;
      }

      case 'intimateHair': {
        const data = this.intimateHairs[index];
        if (event.checked) {
          this.intimateHairsFilterArray.push({'intimateHair.slug': data.slug});
        } else {
          const fIndex = this.intimateHairsFilterArray.findIndex(f => f['intimateHair.slug'] === data.slug);
          this.intimateHairsFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const intimateHairs = this.intimateHairsFilterArray.map(m => m['intimateHair.slug']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {intimateHairs: intimateHairs}, queryParamsHandling: 'merge'}
        );

        break;
      }

      case 'bodyType': {
        const data = this.bodyTypes[index];
        if (event.checked) {
          this.bodyTypesFilterArray.push({'bodyType.slug': data.slug});
        } else {
          const fIndex = this.bodyTypesFilterArray.findIndex(f => f['bodyType.slug'] === data.slug);
          this.bodyTypesFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const bodyTypes = this.bodyTypesFilterArray.map(m => m['bodyType.slug']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {bodyTypes: bodyTypes}, queryParamsHandling: 'merge'}
        );

        break;
      }

      case 'hairColor': {
        const data = this.hairColors[index];
        if (event.checked) {
          this.hairColorsFilterArray.push({'hairColor.slug': data.slug});
        } else {
          const fIndex = this.hairColorsFilterArray.findIndex(f => f['hairColor.slug'] === data.slug);
          this.hairColorsFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const hairColors = this.hairColorsFilterArray.map(m => m['hairColor.slug']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {hairColors: hairColors}, queryParamsHandling: 'merge'}
        );

        break;
      }
      case 'orientation': {
        const data = this.orientations[index];
        if (event.checked) {
          this.orientationsFilterArray.push({'orientation.slug': data.slug});
        } else {
          const fIndex = this.orientationsFilterArray.findIndex(f => f['orientation.slug'] === data.slug);
          this.orientationsFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const orientations = this.orientationsFilterArray.map(m => m['orientation.slug']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {orientations: orientations}, queryParamsHandling: 'merge'}
        );

        break;
      }
      case 'division': {
        const data = this.divisions[index];
        if (event.checked) {
          this.divisionFilterArray.push({'division.name': data.name});
        } else {
          const fIndex = this.divisionFilterArray.findIndex(f => f['division.name'] === data.name);
          this.divisionFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const divisions = this.divisionFilterArray.map(m => m['division.name']);
        this.router.navigate(
          ['/ads'],
          {queryParams: {divisions: divisions}, queryParamsHandling: 'merge'}
        );

        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * CHECK BOX CHECKER
   * checkCategoryFilter()
   * checkSubCategoryFilter()
   * checkBrandFilter()
   */
  checkCategoryFilter() {
    this.categories.forEach((cat, i) => {
      const fIndex = this.selectedCategories.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.categories[i].select = true;
      }
    });
  }

  checkintimateHairFilter() {
    this.intimateHairs.forEach((cat, i) => {
      const fIndex = this.selectedintimateHairs.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.intimateHairs[i].select = true;
      }
    });
  }

  checkBodyTypeFilter() {
    this.bodyTypes.forEach((cat, i) => {
      const fIndex = this.selectedBodyTypes.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.bodyTypes[i].select = true;
      }
    });
  }

  checkHairColorFilter() {
    this.hairColors.forEach((cat, i) => {
      const fIndex = this.selectedHairColors.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.hairColors[i].select = true;
      }
    });
  }


  checkOrientationsFilter() {
    this.orientations.forEach((cat, i) => {
      const fIndex = this.selectedOrientations.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.orientations[i].select = true;
      }
    });
  }

  checkTypeFilter() {
    this.types.forEach((cat, i) => {
      const fIndex = this.selectedTypes.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.types[i].select = true;
      }
    });
  }

  checkDivisionFilter() {
    this.divisions.forEach((cat, i) => {
      const fIndex = this.selectedDivision.findIndex(f => f === cat.name);
      if (fIndex !== -1) {
        this.divisions[i].select = true;
      }
    });
  }

  /**
   * RESET FILTER
   * resetCategoryFilter()
   * resetSubCategoryFilter()
   * resetBrandFilter()
   */

  resetCategoryFilter() {
    this.selectedCategories = [];
    this.categoryFilterArray = [];
    this.categories.forEach((cat, i) => {
      this.categories[i].select = false;
    });
    this.router.navigate(
      ['/ads'],
      {queryParams: {categories: []}, queryParamsHandling: 'merge'}
    );
  }

  resetTypeFilter() {
    this.selectedTypes = [];
    this.typeFilterArray = [];
    this.types.forEach((cat, i) => {
      this.types[i].select = false;
    });
    this.router.navigate(
      ['/ads'],
      {queryParams: {types: []}, queryParamsHandling: 'merge'}
    );
  }

  resetDivisionFilter() {
    this.selectedDivision = [];
    this.divisionFilterArray = [];
    this.divisions.forEach((cat, i) => {
      this.divisions[i].select = false;
    });
    this.router.navigate(
      ['/ads'],
      {queryParams: {divisions: []}, queryParamsHandling: 'merge'}
    );
  }


  /**
   * HTTP REQ HANDLE
   * getAllType()
   * getAllDivision();
   */

  private getAllType() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataOne = this.typeService.getAllType(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.types = res.data;
          // Check Filtered
          this.checkTypeFilter();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getAllCategory() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataTwo = this.categoryService
      .getAllCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.categories = res.data;
            // Check Filtered
            this.checkCategoryFilter();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllDivision() {
    let mSelect = {
      name: 1,
    }
    const filter: FilterData = {
      filter: {status: 'publish'},
      select: mSelect,
      pagination: null,
      sort: {name: 1}
    }

    this.subDataThree = this.divisionService.getAllDivisions(filter).subscribe(
      (res) => {
        if (res.success) {
          this.divisions = res.data;
          // Check Filtered
          this.checkDivisionFilter();
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getAllHairColor() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataThree = this.hairColorService.getAllHairColor(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.hairColors = res.data;
          this.checkHairColorFilter();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getAllIntimateHair() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataFour = this.intimateHairService.getAllIntimateHair(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.intimateHairs = res.data;
          this.checkintimateHairFilter();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getAllOrientation() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataFive = this.orientationService.getAllOrientation(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.orientations = res.data;
          this.checkOrientationsFilter();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getAllBodyType() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataSeven = this.bodyTypeService.getAllBodyType(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.bodyTypes = res.data;
          this.checkBodyTypeFilter();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /**
   * Product list left menu responsive.
   * onHideFilterArea();
   */
  onHideFilterArea() {
    this._productList.onFilterAreaShown();
  }

  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }

    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
  }


}

