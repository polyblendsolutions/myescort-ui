import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/common/header.service';

import { MatDialog } from '@angular/material/dialog';
import { OpenDalogComponent } from './open-dalog/open-dalog.component';
import { FilterData } from '../../../interfaces/core/filter-data';
import { ProductService } from '../../../services/common/product.service';
import { Product } from '../../../interfaces/common/product.interface';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/core/utils.service';
import { UiService } from '../../../services/core/ui.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /* HEADER FIXED */
  headerFixed: boolean = false;
  isCookieBannerVisible: boolean = true;
  /**
   * Show and hide responsive nav.
   * Get subject data.
   */
  products: Product[] = [];

  // FilterData
  filter: any = null;

  // Subscriptions
  private subAllProductByUser: Subscription;
  showHideResponsiveNav: boolean = false;
  private subGetProductDetail: Subscription;
  private subGetProductByID: Subscription;
  changeColor: boolean = false;

  constructor(
    private _headerService: HeaderService,
    public dialog: MatDialog,
    public router: Router,
    public utilsService: UtilsService,
    public uiService: UiService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._headerService.headerColorChange.subscribe((res) => {
      this.changeColor = res;
    });
    // this.openComponentDialog()
    this.getAllProduct();
    const MILLISECONDS_IN_MONTH = 30 * 24 * 60 * 60 * 1000;
    const lastDialogShown = localStorage.getItem('lastDialogShown');
    this.isCookieBannerVisible =
      !lastDialogShown ||
      Date.now() - parseInt(lastDialogShown, 10) > MILLISECONDS_IN_MONTH;
  }

  private getAllProduct() {
    // Select
    const mSelect = {
      image: 1,
      title: 1,
      name: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subAllProductByUser = this.productService
      .getAllProductsByUser(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  private getProductById(id: string): Observable<Product> {
    return new Observable<Product>((observer) => {
      this.subGetProductByID = this.productService.getProductById(id).subscribe(
        (res) => {
          if (res.success) {
            observer.next(res.data);
            observer.complete();
          }
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }
  /**
   * RESPONSIVE NAV
   * HEADER FIXED
   */
  onShowHideResponsiveNav() {
    this.showHideResponsiveNav = !this.showHideResponsiveNav;
  }
  onShowHideResponsive() {
    this.showHideResponsiveNav = !this.showHideResponsiveNav;

    // TODO: @sewren : update the logic condition

    // if(this.products?.length){
    //   // this.uiService.warn('Already added one post')
    //   this.router.navigate(['/account/my-list']).then()
    //   // return;
    // }

    if (this.products?.length) {
      const productId = this.products[0]._id;
      this.subGetProductDetail = this.getProductById(productId).subscribe(
        (res) => {
          if (res?.status === 'publish') {
            this.router.navigate(['/account/my-list']);
          } else {
            this.router.navigate(['/create-new']);
          }
        }
      );
    } else {
      this.router.navigate(['/create-new']);
    }
    // if(!this.products?.length) {
    // }
  }

  @HostListener('window:scroll')
  scrollBody() {
    if (window.scrollY > 50) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  /**
   * OPEN COMPONENT DIALOG
   */

  public openComponentDialog() {
    this.dialog.open(OpenDalogComponent, {
      // panelClass: ['theme-dialog', 'full-screen-modal'],
      disableClose: true,
      height: 'auto',
      width: '350px',
      position: { left: '10px', bottom: '10px' },
    });
  }

  isHideCookie() {
    this.isCookieBannerVisible = false;
    localStorage.setItem('lastDialogShown', Date.now().toString());
  }

  isShowCookie() {
    const MILLISECONDS_IN_MONTH = 30 * 24 * 60 * 60 * 1000;
    const lastDialogShown = localStorage.getItem('lastDialogShown');
    this.isCookieBannerVisible =
      !lastDialogShown ||
      Date.now() - parseInt(lastDialogShown, 10) > MILLISECONDS_IN_MONTH;
  }

  onLogout() {
    this.userService.userLogOut();
    this.showHideResponsiveNav = !this.showHideResponsiveNav;
  }

  ngOnDestroy(): void {
    if (this.subAllProductByUser) {
      this.subAllProductByUser.unsubscribe();
    }
    if (this.subGetProductByID) {
      this.subGetProductByID.unsubscribe();
    }
    if (this.subGetProductDetail) {
      this.subGetProductDetail.unsubscribe();
    }
  }
}
