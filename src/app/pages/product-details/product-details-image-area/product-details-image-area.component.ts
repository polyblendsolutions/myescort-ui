import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { WishList } from 'src/app/interfaces/common/wish-list.interface';
import { UserService } from 'src/app/services/common/user.service';
import { WishListService } from 'src/app/services/common/wish-list.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { NgxWatermarkOptions } from "ngx-watermark";
import { SwiperComponent } from 'swiper/angular';



@Component({
  selector: 'app-product-details-image-area',
  templateUrl: './product-details-image-area.component.html',
  styleUrls: ['./product-details-image-area.component.scss']
})
export class ProductDetailsImageAreaComponent implements OnInit {
  //Store Data
  @Input() product: Product;
  @Input() selectedImage: string;
  // Wishlist Data
  wishlists: WishList[];
  wishlist: WishList = null;
  image: string;
  public showFullImage: boolean = false
  public enableClickListener: boolean = false;

  // Image Zoom & View Area
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  //Subscription
  private subRefreshWishList: Subscription;
  private subGetWishList: Subscription;
  private subAddWishList: Subscription;
  private subDeleteWishList: Subscription;

  constructor(
    private reloadService: ReloadService,
    private wishListService: WishListService,
    private uiService: UiService,
    private userService: UserService,
    private router: Router,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    // WiSHLIST FUNCTION STORED
    this.subRefreshWishList = this.reloadService.refreshWishList$.subscribe(() => {
      this.getWishListByUser();
    });
    this.getWishListByUser();
  }

  toggleModal() {
    this.showFullImage = !this.showFullImage;
    this.enableClickListener = false;
  }

  options: NgxWatermarkOptions = {
    text: 'This is NGX-WATERMARK',
    fontFamily: 'Kanit',
    color: '#999',
    alpha: 0.7,
    degree: -45,
    fontSize: '20px',
  };
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
    this.subGetWishList = this.wishListService.getWishListByUser()
      .subscribe(res => {
        this.wishlists = res.data;
        this.checkWishList();
        console.log('w', this.wishlists);
      }, error => {
        console.log(error);
      });
  }

  addToWishListDB(data: WishList) {
    this.subAddWishList = this.wishListService.addToWishList(data)
      .subscribe(res => {
        // console.log(res);
        this.uiService.success(res.message);
        this.reloadService.needRefreshWishList$();
      }, error => {
        console.log(error);
      });
  }


  public removeWishlistById(wishlistId: string) {
    this.subDeleteWishList = this.wishListService.deleteWishListById(wishlistId)
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
    this.image = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/png/fallbackImage.png';
  }

  onSelectImage(imageUrl: string, index: number) {
    this.selectedImage = imageUrl;
    if (this.swiper && this.swiper.swiperRef) {
      this.swiper.swiperRef.slideTo(index + 1);
    }
  }

  showImages(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.showFullImage = !this.showFullImage;
    setTimeout(() => {
      this.enableClickListener = true;
    }, 100)
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
    if (this.subRefreshWishList) {
      this.subRefreshWishList.unsubscribe();
    }
    if (this.subGetWishList) {
      this.subGetWishList.unsubscribe();
    }
    if (this.subAddWishList) {
      this.subAddWishList.unsubscribe();
    }
    if (this.subDeleteWishList) {
      this.subDeleteWishList.unsubscribe();
    }

  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.showFullImage) {
        this.showFullImage = false;
        this.enableClickListener = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const classList = event.target?.['classList'];
    if (!classList.contains('swiper-product-image') && !classList.contains('swiper-button-next') && !classList.contains('swiper-button-prev')) {
      if (this.enableClickListener && this.showFullImage) {
        this.showFullImage = false;
        this.enableClickListener = false;
      }
    }
  }
}
