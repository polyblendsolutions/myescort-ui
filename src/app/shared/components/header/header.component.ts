import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/common/header.service';

import {MatDialog} from "@angular/material/dialog";
import {OpenDalogComponent} from "./open-dalog/open-dalog.component";
import {FilterData} from "../../../interfaces/core/filter-data";
import {ProductService} from "../../../services/common/product.service";
import {Product} from "../../../interfaces/common/product.interface";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/core/utils.service";
import {UiService} from "../../../services/core/ui.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /* HEADER FIXED */
  headerFixed: boolean = false;
  isShow: boolean = true;
  /**
   * Show and hide responsive nav.
   * Get subject data.
  */
  products: Product[] = [];

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  showHideResponsiveNav: boolean = false;
  changeColor: boolean = false;

  constructor(
    private _headerService: HeaderService,
    public dialog: MatDialog,
    public router: Router,
    public utilsService: UtilsService,
    public uiService: UiService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this._headerService.headerColorChange.subscribe(
      res => {
        this.changeColor = res;

      }
    )
// this.openComponentDialog()
    this.getAllProduct();

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

    this.subDataOne = this.productService
      .getAllProductsByUser(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.data;
            console.log('erwer',this.products);
          }
        },
        error: (err) => {
          console.log(err);
        },
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

    // if(!this.products?.length) {
      this.router.navigate(['/create-new']).then()
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
      position: { left: '10px', bottom: '10px' }
    });
  }

  isHideCooki(){
    this.isShow = false;
  }

  isShowCooki(){
    this.isShow = true;
  }



}
