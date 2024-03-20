import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {QuickViewDialogComponent} from "../marketplace-card/quick-view-dialog/quick-view-dialog.component";
import { WishListService } from 'src/app/services/common/wish-list.service';
import { WishList } from 'src/app/interfaces/common/wish-list.interface';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UserService } from 'src/app/services/common/user.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit{
  @Input() data?: Product;
  tesData:any;
  wishlists: WishList[];
  wishlist: WishList = null;


  //Subscription
  private subReloadOne: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  titleData:any;
  constructor(
    public dialog: MatDialog,
    private router:Router,
    private wishListService: WishListService,
    private reloadService: ReloadService,
    private userService: UserService,
    private uiService: UiService,
  ) {}
  ngOnInit() {
    this.tesData = this.data?.category.name;
    // this.tesData = this.data?.name.split(",")[0];

    const title = this.data?.name.substring(this.tesData.length).trim();

    var result = title.substring(1, title.length);

    this.titleData = this.data?.name;

    this.subReloadOne = this.reloadService.refreshWishList$.subscribe(() => {
      this.getWishListByUser();
    });
    this.getWishListByUser();

    // console.log('daerqweata',this.data)
    // console.log('daerqweata'this.data)
  }

  public openComponentDialog(id?: string) {
    // if(id){
    //   this.router.navigate([],{queryParams:{productId:id},queryParamsHandling:"merge"})
    // }
    this.dialog.open(QuickViewDialogComponent, {
      data:id,
      panelClass: ['theme-dialog', 'full-screen-modal'],
      autoFocus: false,
      disableClose: false
    });
  }


  private getWishListByUser() {
    this.subDataOne = this.wishListService.getWishListByUser()
      .subscribe(res => {
        this.wishlists = res.data;
        this.checkWishList();
        console.log('w', this.wishlists);
      }, error => {
        console.log(error);
      });
  }

  addToWishListDB(data: WishList) {
    this.subDataTwo = this.wishListService.addToWishList(data)
      .subscribe(res => {
        // console.log(res);
        this.uiService.success(res.message);
        this.reloadService.needRefreshWishList$();
      }, error => {
        console.log(error);
      });
  }

  checkWishList() {
    this.wishlist = this.wishlists.find(f => (f.product as Product)?._id === this.data?._id);
  }


  public removeWishlistById(wishlistId: string) {
    this.subDataThree = this.wishListService.deleteWishListById(wishlistId)
      .subscribe(res => {
        this.reloadService.needRefreshWishList$();
        this.uiService.success(res.message);
      }, error => {
        console.log(error);
      });
  }


  onAddToWishList(event: MouseEvent) {
    event.stopPropagation();
    if (this.wishlist) {
      this.removeWishlistById(this.wishlist?._id);
    } else {
      const data: WishList = {
        product: this.data?._id,
        selectedQty: 1,
      };
      if (this.userService.getUserStatus()) {
        this.addToWishListDB(data);
      } else {
        this.router.navigate(['/login']);
        this.reloadService.needRefreshWishList$();
      }
    }

  }
}
