import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { WishList } from 'src/app/interfaces/common/wish-list.interface';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';
import { UserService } from 'src/app/services/common/user.service';
import { WishListService } from 'src/app/services/common/wish-list.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';



@Component({
  selector: 'app-product-details-image-area',
  templateUrl: './product-details-image-area.component.html',
  styleUrls: ['./product-details-image-area.component.scss']
})
export class ProductDetailsImaaeAreaComponent implements OnInit {
  //Store Data
  @Input() product: Product;
  @Input() selectedImage: string;
  // Wishlist Data
  wishlists: WishList[];
  wishlist: WishList = null;
  image: string;
  zoomImage: string;
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  //Subscription
  private subReloadOne: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private _carouselCtrl: CarouselCntrlService,
    private reloadService: ReloadService,
    private wishListService: WishListService,
    private uiService: UiService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // WiSHLIST FUNCTION STORED
    this.subReloadOne = this.reloadService.refreshWishList$.subscribe(() => {
      this.getWishListByUser();
    });
    this.getWishListByUser();
  }


  /**
 * Button Click Event Handle
 * onAddToWishList()
 */
  onAddToWishList(event: MouseEvent) {
    event.stopPropagation();
    if (this.wishlist) {
      this.removeWishlistById(this.wishlist?._id);
    } else {
      const data: WishList = {
        product: this.product?._id,
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

  /**
* HTTP REQ HANDLE
* addToWishListDB()
* removeWishlistById()
*/

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


  public removeWishlistById(wishlistId: string) {
    this.subDataThree = this.wishListService.deleteWishListById(wishlistId)
      .subscribe(res => {
        this.reloadService.needRefreshWishList$();
        this.uiService.success(res.message);
      }, error => {
        console.log(error);
      });
  }

  /**
   * LOGICAL METHODS
   * checkWishList()
   */
  checkWishList() {
    this.wishlist = this.wishlists.find(f => (f.product as Product)?._id === this.product?._id);
  }


  /**
   * CHANGE IMAGE FUNCTION
   * selectImage();
  */

  private setDefaultImage() {
    this.image = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/placeholder/test.png';
    this.zoomImage = this.image;
  }

  onSelectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.zoomImage = imageUrl;
  }


  public onMouseMove(e) {
    if (window.innerWidth >= 1099) {
      const image = e.currentTarget;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const x = offsetX / image.offsetWidth * 110;
      const y = offsetY / image.offsetHeight * 110;
      const zoom = this.zoomViewer.nativeElement.children[0];
      if (zoom) {
        zoom.style.backgroundPosition = x + '% ' + y + '%';
        zoom.style.display = 'block';
        zoom.style.height = `${image.height}px`;
        zoom.style.width = `${image.width + 30}px`;
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }

  }

}
