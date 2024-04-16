import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/common/user.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { AccountSidebarComponent } from '../account-sidebar/account-sidebar.component';
import {FilterData} from "../../../interfaces/core/filter-data";
import {ProductService} from "../../../services/common/product.service";
import {Product} from "../../../interfaces/common/product.interface";
import * as moment from 'moment'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {
  products: Product[] = [];

  // FilterData
  filter: any = {showExpired: true};

  // Subscriptions
  private subDataOne: Subscription;
  user: User;
  // Image Upload
  imageChangedEvent: any = null;
  imgPlaceHolder = "/assets/images/png/profile.jpg";

  //Subscription
  private subUserData: Subscription;
  private subRealod:Subscription;
  constructor(
    private userDataService: UserDataService,
    private reloadService:ReloadService,
    private productService: ProductService,
  ) {

  }
  ngOnInit(): void {
      //Reload Data
      this.subRealod = this.reloadService.refreshData$.subscribe(() => {
        this.getLoggedInUserData();
      })
    //Base Data
    this.getLoggedInUserData();
    // Reload
    this.getAllProduct();
  }

  /***
   * HTTP REQUEST HANDLE
   *  getLoggedInUserData()
   *  getAllDivision()
   *  getAllArea()
   *  updateAccountDetails()
   */
  getLoggedInUserData() {
    this.subUserData = this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
          this.imgPlaceHolder = this.user.profileImg
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
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
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
    if(this.subRealod){
      this.subRealod.unsubscribe();
    }
    if(this.subUserData){
      this.subUserData.unsubscribe();
    }

 }

 checkIsActive(){
  return moment().diff(this.products[0]?.publishDate, 'days') < 30
 }

}
