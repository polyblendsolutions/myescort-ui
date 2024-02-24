import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import {
  EMPTY,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  pluck,
  switchMap,
} from 'rxjs';
import { Category } from 'src/app/interfaces/common/category.interface';
import { Division } from 'src/app/interfaces/common/division.interface';
import { Product } from 'src/app/interfaces/common/product.interface';
import { Type } from 'src/app/interfaces/common/type.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { BannerService } from 'src/app/services/common/banner.service';
import { CategoryService } from 'src/app/services/common/category.service';
import { DivisionService } from 'src/app/services/common/division.service';
import { ProductService } from 'src/app/services/common/product.service';
import { TypeService } from 'src/app/services/common/type.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss'],
})
export class SearchAreaComponent implements OnInit, OnDestroy {
  @Input() titleData: string;
  data: any;
  // store data
  types: Type[] = [];
  categorys: Category[] = [];
  id?: string;
  searchQuery: string;
  searchQueryProduct: string;

  divisions: Division[];
  @ViewChild('searchForm') searchForm: NgForm;
  advanchFilter = false;
  @ViewChild('matMenuBtn') matMenuBtn!: MatMenuTrigger;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;
  dataForm?: FormGroup;
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
  isSelectedValue: any;
  isSelectedDis: boolean = false;
  isSelectedAll: boolean = true;
  // Subscriptions
  private subDataOne: Subscription;
  private subDivisionData: Subscription;
  private subForm: Subscription;
  constructor(
    private categoryService: CategoryService,
    private typeService: TypeService,
    private divisionService: DivisionService,
    private router: Router,
    private fb: FormBuilder,
    private uiService: UiService,
    private bannerService: BannerService,
    private productService: ProductService,
    private reloadService: ReloadService
  ) {}
  ngOnInit(): void {
    this.data = this.router.url;
    this.initDataForm();
    this.getAllCategory();
    this.getAllType();
    this.getAllDivision();
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      location: [null],
      category: [null],
      type: [null],
    });
  }

  ngAfterViewInit() {
    const formValue = this.searchForm?.valueChanges;
    this.subForm = formValue
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

    // this.searchAnim();
  }

  onSubmit() {
    this.router.navigate(['/ads'], {
      queryParams: {
        categories: this.dataForm.value.category,
        types: this.dataForm.value.type,
        divisions: this.dataForm.value.location,
      },
      queryParamsHandling: '',
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
    target.placeholder = '';
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

  onSelectItem(data: Product): void {
    this.searchInput.nativeElement.value = '';
    // this.router.navigate(['/', 'product-list'], {
    //   queryParams: { searchQuery: data },
    //   queryParamsHandling: 'merge',
    // });
    this.handleCloseAndClear();
    this.router.navigate(['/ad-details', data]);
  }

  onSearchNavigate() {
    let inputVal = (this.searchInput.nativeElement as HTMLInputElement).value;
    if (inputVal) {
      this.router.navigate(['/', 'product-list'], {
        queryParams: { searchQuery: inputVal },
        queryParamsHandling: '',
      });
      this.searchInput.nativeElement.value = '';
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
    target.placeholder = '|';
    this.typeIt(target);
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

    this.subDataOne = this.typeService.getAllType(filter, null).subscribe({
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

    this.subDataOne = this.categoryService
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
      sort: { createdAt: -1 },
    };

    this.subDivisionData = this.divisionService
      .getAllDivisions(filter)
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

  onHideFilter() {
    this.advanchFilter = !this.advanchFilter;
  }

  onSelectBtnDis(value: any, event: MouseEvent) {
    event.stopImmediatePropagation();
    this.isSelectedValue = value;
    this.isSelectedDis = true;
    this.isSelectedAll = false;
    this.dataForm.patchValue({
      location: this.isSelectedValue,
    });

    // this.menu?.closeMenu()

    this.matMenuBtn.closeMenu();
  }

  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
  }
}
