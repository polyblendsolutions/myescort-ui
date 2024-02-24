import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishList } from 'src/app/interfaces/common/wish-list.interface';
import { WishListService } from 'src/app/services/common/wish-list.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  // Wishlist Data
  wishlists: WishList[];

  //Subscription
  private subReloadOne: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private reloadService: ReloadService,
    private wishListService: WishListService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    // WiSHLIST FUNCTION STORED
    this.subReloadOne = this.reloadService.refreshWishList$.subscribe(() => {
      this.getWishListByUser();
    });
    this.getWishListByUser();
  }

  /**
   * HTTP REQ HANDLE
   * addToWishListDB()
   * removeWishlistById()
   */

  private getWishListByUser() {
    this.subDataOne = this.wishListService.getWishListByUser().subscribe(
      (res) => {
        this.wishlists = res.data;
        console.log("ffff",this.wishlists);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public removeWishlistById(wishlistId: string) {
    this.subDataTwo = this.wishListService
      .deleteWishListById(wishlistId)
      .subscribe(
        (res) => {
          this.reloadService.needRefreshWishList$();
          this.uiService.success(res.message);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * ON DESTROY ALL SUBSCRIPTION
   */

  ngOnDestroy(): void {
    if (this.subReloadOne) {
      this.subReloadOne.unsubscribe();
    }
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }
}
