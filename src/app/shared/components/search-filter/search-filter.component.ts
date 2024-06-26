import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EMPTY,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  pluck,
  switchMap,
} from 'rxjs';
import Typed from 'typed.js';
import { Banner } from '../../../interfaces/common/banner.interface';
import { Category } from '../../../interfaces/common/category.interface';
import { Division } from '../../../interfaces/common/division.interface';
import { Product } from '../../../interfaces/common/product.interface';
import { Type } from '../../../interfaces/common/type.interface';
import { FilterData } from '../../../interfaces/core/filter-data';
import { BannerService } from '../../../services/common/banner.service';
import { CategoryService } from '../../../services/common/category.service';
import { DivisionService } from '../../../services/common/division.service';
import { ProductService } from '../../../services/common/product.service';
import { TypeService } from '../../../services/common/type.service';
import { ReloadService } from '../../../services/core/reload.service';
import { UiService } from '../../../services/core/ui.service';
import { BodyType } from 'src/app/interfaces/common/bodyType.interface';
import { HairColorService } from 'src/app/services/common/hairColor.service';
import { IntimateHairService } from 'src/app/services/common/intimateHair.service';
import { OrientationService } from 'src/app/services/common/orientation.service';
import { BodyTypeService } from 'src/app/services/common/bodyType.service';
import { Orientation } from 'src/app/interfaces/common/orientation.interface';
import { IntimateHair } from 'src/app/interfaces/common/intimateHair.interface';
import { HairColor } from 'src/app/interfaces/common/hairColor.interface';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @ViewChild('menu') menu: MatMenu;
  @ViewChild('categoryMenu') categoryMenu: MatMenu;
  @ViewChild('typeMenu') typeMenu: MatMenu;
  @ViewChild('searchForm') searchForm: NgForm;
  // store data
  types: Type[] = [];
  categorys: Category[] = [];
  banners: Banner[] = [];
  id?: string;
  searchQuery: string;
  searchQueryProduct: string;
  divisions: Division[];
  bodyTypes: BodyType[] = [];
  hairColors: HairColor[] = [];
  intimateHairs: IntimateHair[] = [];
  orientations: Orientation[] = [];
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;
  dataForm?: FormGroup;
  // FilterData
  filter: any = null;
  overlay = false;
  isOpen = false;
  isOpen1 = false;
  isFocused = false;
  isLoading = false;
  searchProducts: Product[] = [];
  timeOutOngoing: any;
  char = 0;
  txt = 'Indtast dit nøgleord her...';

  // select location
  isSelectedDis: boolean = false;
  isSelectedAll: boolean = true;
  isSelectedValue: any;

  // select category
  isSelectedCategory: boolean = false;
  isSelectedAllCategory: boolean = true;
  isSelectedValueCategory: any;

  // select type
  isSelectedType: boolean = false;
  isSelectedAllType: boolean = true;
  isSelectedValueType: any;

  // Subscriptions
  private subTypeService: Subscription;
  private subDivisionData: Subscription;
  private subFilterForm: Subscription;
  private subHairColor: Subscription;
  private subIntimateHair: Subscription;
  private subOrientation: Subscription;
  private subBodyType: Subscription;
  private subRouteOne: Subscription;

  //Advanch Filter variables
  public advanchFilter: boolean = false;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private bannerService: BannerService,
    private divisionService: DivisionService,
    private productService: ProductService,
    private reloadService: ReloadService,
    private router: Router,
    private hairColorService: HairColorService,
    private intimateHairService: IntimateHairService,
    private orientationService: OrientationService,
    private bodyTypeService: BodyTypeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subRouteOne = this.activatedRoute.queryParams.subscribe((qParam) => {
      if (Object.keys(qParam).length > 0) {
        // Check if searchQuery exists in queryParams
        if (qParam.hasOwnProperty('searchQuery')) {
          this.searchQuery = qParam['searchQuery'].trim();
        }
        this.initDataForm(qParam);
      } else {
        this.initDataForm();
      }
      this.getAllCategory();
      this.getAllType();
      this.getAllDivision();
      this.getAllBanner();
      this.getAllHairColor();
      this.getAllIntimateHair();
      this.getAllOrientation();
      this.getAllBodyType();
      const options = {
        strings: ['København', 'Aalborg', 'Odense', 'Aarhus'],
        typeSpeed: 100,
        backSpeed: 60,
        showCursor: true,
        cursorChar: '',
        loop: true,
      };
    });

    /*
      'København',
      'Aalborg',
      'Odense',
      'Aarhus'
    */

    // const typed = new Typed('.typed-element', options);
  }

  arrData: string[] = ['København', 'Aalborg', 'Odense', 'Aarhus'];
  count?: number = this.arrData.length - 1;

  innerW = window.innerWidth;

  ngAfterViewInit() {
    const formValue = this.searchForm?.valueChanges;
    this.subFilterForm = formValue
      ?.pipe(
        pluck('searchTerm'),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((data) => {
          this.searchQuery = data?.trim();
          if (this.searchQuery === '' || this.searchQuery === null) {
            this.overlay = false;
            this.searchProducts = [];
            this.searchQuery = null;
            return EMPTY;
          }
          this.isLoading = true;
          const pagination: any = {
            pageSize: 12,
            currentPage: 0,
          };
          const mSelect = {
            name: 1,
            slug: 1,
            title: 1,
            images: 1,
            category: 1,
            subCategory: 1,
            brand: 1,
            prices: 1,
            salePrice: 1,
            variationsOptions: 1,
            status: 1,
            discountType: 1,
            variationList: 1,
            discountAmount: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: { status: 'publish' },
            select: mSelect,
            sort: { name: 1 },
          };
          return this.productService.getAllProducts(
            filterData,
            this.searchQuery
          );
        })
      )
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.searchProducts = res.data.sort(
            (a, b) =>
              a.name?.toLowerCase().indexOf(this.searchQuery?.toLowerCase()) -
              b.name?.toLowerCase().indexOf(this.searchQuery?.toLowerCase())
          );
          if (this.searchProducts?.length > 0) {
            this.isOpen = true;
            this.overlay = true;
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  @HostListener('window:resize')
  // Comment due to resolve error: slideOne is not defined
  // resizeMain() {
  //   this.innerW = window.innerWidth;
  //   if (this.innerW < 578 && this.innerW > 420) {
  //     let step = 0;
  //     let translateY = 111;
  //     let ul = document.getElementById('sliderOne');
  //     setInterval(() => {
  //       if (this.arrData.length > step) {
  //         step++;
  //         translateY -= 37;
  //         ul.style.transform = `translateY(-${translateY}px)`;
  //       }

  //       if (this.arrData.length === step) {
  //         step = 0;
  //         translateY = 96;
  //         ul.style.transform = `translateY(-${translateY}px)`;
  //       }
  //     }, 3000);
  //   }

  //   if (this.innerW < 420) {
  //     let step = 0;
  //     let translateY = 69;
  //     let ul = document.getElementById('sliderOne');
  //     setInterval(() => {
  //       if (this.arrData.length > step) {
  //         step++;
  //         translateY -= 23;
  //         ul.style.transform = `translateY(-${translateY}px)`;
  //       }

  //       if (this.arrData.length === step) {
  //         step = 0;
  //         translateY = 69;
  //         ul.style.transform = `translateY(-${translateY}px)`;
  //       }
  //     }, 3000);
  //   }
  // }
  private initDataForm(params?) {
    this.dataForm = this.fb.group({
      location: [null],
      area: [null],
      zone: [null],
      category: [null],
      type: [null],
      height: this.fb.group({
        minHeight: [140],
        maxHeight: [220],
      }),
      weight: this.fb.group({
        minWeight: [40],
        maxWeight: [300],
      }),
      age: this.fb.group({
        minAge: [18],
        maxAge: [80],
      }),
      bodytype: [null],
      hairColor: [null],
      intimateHairs: [null],
      drivingEscort: [false],
      ownPlace: [false],
      acceptsHandicapped: [false]
    });

    setTimeout(() => {
      if (params && Object.keys(params).length > 0) {
        if (params['bodyTypes']) {
          this.dataForm.controls['bodytype'].setValue(params['bodyTypes']);
        }
        if (params['hairColors']) {
          this.dataForm.controls['hairColor'].setValue(params['hairColors']);
        }
        if (params['intimateHairs']) {
          this.dataForm.controls['intimateHairs'].setValue(
            params['intimateHairs']
          );
        }
        if (params['divisions']) {
          this.onSelectBtnDis(params['divisions']);
        }
        if (params['categories']) {
          this.onSelectBtnCategory(params['categories']);
        }
        if (params['types']) {
          this.onSelectBtnType(params['types']);
        }
        if (params['age']) {
          const minmaxArr = params['age'].split('-');
          this.dataForm.controls['age'].setValue({
            minAge: minmaxArr[0],
            maxAge: minmaxArr[1],
          });
        }
        if (params['weight']) {
          const minmaxArr = params['weight'].split('-');
          this.dataForm.controls['weight'].setValue({
            minWeight: minmaxArr[0],
            maxWeight: minmaxArr[1],
          });
        }
        if (params['height']) {
          const minmaxArr = params['height'].split('-');
          this.dataForm.controls['height'].setValue({
            minHeight: minmaxArr[0],
            maxHeight: minmaxArr[1],
          });
        }
        if (params['drivingEscort']) {
          this.dataForm.controls['drivingEscort'].setValue(true);
        }
        if (params['ownPlace']) {
          this.dataForm.controls['ownPlace'].setValue(true);
        }
        if (params['acceptsHandicapped']) {
          this.dataForm.controls['acceptsHandicapped'].setValue(true);
        }
      }
    }, 1000);
  }

  onSubmit() {
    let inputVal = (this.searchInput.nativeElement as HTMLInputElement).value;
    if (inputVal) {
      this.onSearchNavigate();
      return;
    }
    const formData = this.dataForm.value;
    let queryParams = {
      searchQuery: null,
      categories: formData.category,
      types: formData.type,
      divisions: formData.location,
      area: formData.area,
      zone: formData.zone,
      bodyTypes: formData.bodytype,
      hairColors: formData.hairColor,
      intimateHairs: formData.intimateHairs,
      height: null,
      weight: null,
      age: null,
      drivingEscort: null,
      ownPlace: null,
      acceptsHandicapped: null
    };
    if (
      formData.height &&
      (formData.height.minHeight !== 140 || formData.height.maxHeight !== 220)
    ) {
      queryParams.height = `${formData.height.minHeight}-${formData.height.maxHeight}`;
    }

    if (
      formData.weight &&
      (formData.weight.minWeight !== 40 || formData.weight.maxWeight !== 300)
    ) {
      queryParams.weight = `${formData.weight.minWeight}-${formData.weight.maxWeight}`;
    }

    if (
      formData.age &&
      (formData.age.minAge !== 18 || formData.age.maxAge !== 80)
    ) {
      queryParams.age = `${formData.age.minAge}-${formData.age.maxAge}`;
    }
    if (formData.drivingEscort) {
      queryParams['drivingEscort'] = true;
    }

    if (formData.ownPlace) {
      queryParams['ownPlace'] = true;
    }

    if (formData.acceptsHandicapped) {
      queryParams['acceptsHandicapped'] = true;
    }    
    this.advanchFilter = false;
    this.router.navigate(['/ads'], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  /**
   * HANDLE SEARCH Area
   * onClickHeader()
   * onClickSearchArea()
   * handleFocus()
   * setPanelState()
   * handleOpen()
   * handleOutsideClick()
   * handleCloseOnly()
   * handleCloseAndClear()
   * onSelectItem()
   */
  onClickHeader(): void {
    this.searchInput.nativeElement.value = '';
    this.handleCloseOnly();
  }

  onClickSearchArea(event: MouseEvent): void {
    event.stopPropagation();
  }

  handleFocus(event: FocusEvent): void {
    this.searchInput.nativeElement.focus();
    if (this.isFocused) {
      return;
    }
    if (this.searchProducts.length > 0) {
      this.setPanelState(event);
    }
    this.isFocused = true;
    let target = this.searchInput.nativeElement as HTMLInputElement;
    //target.placeholder = '';
    clearInterval(this.timeOutOngoing);
  }

  handleBlur() {
    // this.searchAnim();
    this.char = 0;
  }

  private setPanelState(event: FocusEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = false;
    this.handleOpen();
  }

  handleOpen(): void {
    if (this.isOpen || (this.isOpen && !this.isLoading)) {
      return;
    }
    if (this.searchProducts.length > 0) {
      this.isOpen = true;
      this.overlay = true;
    }
  }

  handleOutsideClick(): void {
    this.searchInput.nativeElement.value = '';
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.isFocused = false;
  }

  handleCloseOnly(): void {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.isFocused = false;
  }

  handleCloseAndClear(): void {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.searchProducts = [];
    this.isFocused = false;
  }

  // onSelectItem(data: Product): void {
  //   console.log('data', data);

  //   this.searchInput.nativeElement.value = '';
  //   // this.router.navigate(['/', 'product-details'+ data], {
  //   //   // queryParams: { searchQuery: data },
  //   //   // queryParamsHandling: 'merge',
  //   // });
  //   this.handleCloseAndClear();
  //   this.router.navigate(['/ad-details', data]);
  // }

  onSearchNavigate() {
    let inputVal = (this.searchInput.nativeElement as HTMLInputElement).value;
    if (inputVal) {
      this.router.navigate(['/', 'ads'], {
        queryParams: { searchQuery: inputVal.trim() },
        queryParamsHandling: '',
      });
      // this.searchInput.nativeElement.value = '';
      this.isOpen = false;
      this.reloadService.needRefreshSearch$(true);
    }
  }

  onNavigate() {
    if (this.router.url === '/') {
      this.onReload();
    } else {
      this.router.navigate(['/']);
    }
  }

  onReload() {
    window.location.reload();
  }

  /**
   * SEARCH PLACEHOLDER ANIMATION
   */

  private searchAnim() {
    const target = this.searchInput.nativeElement as HTMLInputElement;
    // target.placeholder = '|';
    // this.typeIt(target);
  }

  private typeIt(target: HTMLInputElement) {
    const humanize = Math.round(Math.random() * (300 - 30)) + 30;
    this.timeOutOngoing = setTimeout(() => {
      this.char++;
      const type = this.txt?.substring(0, this.char);
      target.placeholder = type + '|';
      this.typeIt(target);
      if (this.char === this.txt?.length) {
        target.placeholder = '|';
        this.char = 0;
      }
    }, humanize);
  }

  valueInput: any;
  onSearchChange(searchValue: string): void {
    this.valueInput = searchValue;
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
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subTypeService = this.typeService.getAllType(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.types = res.data;
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
      sort: { createdAt: -1 },
    };

    this.subTypeService = this.categoryService
      .getAllCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.categorys = res.data;
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
    };
    const filter: FilterData = {
      filter: { status: 'publish' },
      select: mSelect,
      pagination: null,
      sort: { createdAt: 1 },
    };

    this.subDivisionData = this.divisionService
      .getAllDivisionsdd(filter)
      .subscribe(
        (res) => {
          if (res.success) {
            this.divisions = res.data;
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
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
      sort: { name: 1 },
    };

    this.subHairColor = this.hairColorService
      .getAllHairColor(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.hairColors = res.data;
            // this.checkHairColorFilter();
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
      sort: { name: 1 },
    };

    this.subIntimateHair = this.intimateHairService
      .getAllIntimateHair(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.intimateHairs = res.data;
            // this.checkintimateHairFilter();
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
      sort: { name: 1 },
    };

    this.subOrientation = this.orientationService
      .getAllOrientation(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.orientations = res.data;
            // this.checkOrientationsFilter();
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
      sort: { name: 1 },
    };

    this.subBodyType = this.bodyTypeService
      .getAllBodyType(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.bodyTypes = res.data;
            // this.checkBodyTypeFilter();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * HTTP REQ HANDLE
   * getAllBanner()
   * deleteMultipleBannerById()
   */

  private getAllBanner() {
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      mobileImage: 1,
      createdAt: 1,
      bannerType: 1,
      url: 1,
    };

    const filter: FilterData = {
      filter: { bannerType: 'homePageTopBigBanner' },
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subTypeService = this.bannerService
      .getAllBanner(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.banners = res.data;
            console.log('this.banners', this.banners);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSelectBtnDis(value: any, event?: MouseEvent, locationType?: string) {
    if (event) event.stopImmediatePropagation();
    this.isSelectedValue = value;
    this.isSelectedDis = true;
    this.isSelectedAll = false;
    switch (locationType) {
      case 'divisions':
        this.dataForm.patchValue({
          location: this.isSelectedValue,
          area: null,
          zone: null,
        });
        break;
      case 'area':
        this.dataForm.patchValue({
          location: null,
          area: this.isSelectedValue,
          zone: null,
        });
        break;
      case 'zone':
        this.dataForm.patchValue({
          location: null,
          area: null,
          zone: this.isSelectedValue,
        });
        break;
      default:
        break;
    }

    this.menu?.closed.emit();
  }

  onSelectBtnCategory(value: any, event?: MouseEvent) {
    if (event) event.stopImmediatePropagation();
    this.isSelectedValueCategory = value;
    this.isSelectedCategory = true;
    this.isSelectedAllCategory = false;
    this.dataForm.patchValue({
      category: this.isSelectedValueCategory,
    });

    this.categoryMenu?.closed.emit();
  }

  onSelectBtnType(value: any, event?: MouseEvent) {
    if (event) event.stopImmediatePropagation();
    this.isSelectedValueType = value;
    this.isSelectedType = true;
    this.isSelectedAllType = false;
    this.dataForm.patchValue({
      type: this.isSelectedValueType,
    });

    this.typeMenu?.closed.emit();
  }
  /**
   * Advance filter method
   * resetFilter()
   * resetSearch()
   */
  onHideFilter() {
    this.advanchFilter = !this.advanchFilter;
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  resetFilter() {
    this.dataForm = this.fb.group({
      location: [null],
      area: [null],
      zone: [null],
      category: [null],
      type: [null],
      height: this.fb.group({
        minHeight: [140],
        maxHeight: [220],
      }),
      weight: this.fb.group({
        minWeight: [40],
        maxWeight: [300],
      }),
      age: this.fb.group({
        minAge: [18],
        maxAge: [80],
      }),
      bodytype: [null],
      hairColor: [null],
      intimateHairs: [null],
      drivingEscort: [null],
      ownPlace: [null],
      acceptsHandicapped: [null]
    });
    this.onSelectBtnDis(null);
    this.onSelectBtnCategory(null);
    this.onSelectBtnType(null);
    const formData = this.dataForm.value;
    let queryParams = {
      searchQuery: null,
      categories: formData.category,
      types: formData.type,
      divisions: formData.location,
      area: formData.area,
      zone: formData.zone,
      bodyTypes: formData.bodytype,
      hairColors: formData.hairColor,
      intimateHairs: formData.intimateHairs,
      height: null,
      weight: null,
      age: null,
      drivingEscort: null,
      ownPlace: null,
      acceptsHandicapped: null
    };
    this.router.navigate(['/ads'], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetSearch() {
    this.searchQuery = null;
    const queryParams = {
      searchQuery: null,
    };
    this.router.navigate(['/ads'], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */

  ngOnDestroy(): void {
    if (this.subTypeService) {
      this.subTypeService.unsubscribe();
    }
    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
    if (this.subFilterForm) {
      this.subFilterForm.unsubscribe();
    }
    if (this.subHairColor) {
      this.subHairColor.unsubscribe();
    }
    if (this.subIntimateHair) {
      this.subIntimateHair.unsubscribe();
    }
    if (this.subOrientation) {
      this.subOrientation.unsubscribe();
    }
    if (this.subBodyType) {
      this.subBodyType.unsubscribe();
    }
  }
}
