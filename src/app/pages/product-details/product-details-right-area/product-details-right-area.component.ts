import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { WishList } from 'src/app/interfaces/common/wish-list.interface';
import { UserService } from 'src/app/services/common/user.service';
import { WishListService } from 'src/app/services/common/wish-list.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { RatingAndReviewComponent } from '../rating-and-review/rating-and-review.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductReportComponent } from '../product-report/product-report.component';

@Component({
  selector: 'app-product-details-right-area',
  templateUrl: './product-details-right-area.component.html',
  styleUrls: ['./product-details-right-area.component.scss']
})
export class ProductDetailsRightAreaComponent implements OnInit{
  @Input() product:Product;
  wishlists: WishList[];
  wishlist: WishList = null;

  zoomImage: string;
  // Image Zoom & View Area


   //Subscription
   private subReloadOne: Subscription;
   private subDataOne: Subscription;
   private subDataTwo: Subscription;
   private subDataThree: Subscription;
   
  constructor(
    
    private reloadService: ReloadService,
    private wishListService: WishListService,
    private uiService: UiService,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) { }





  

  ngOnInit() {

      // WiSHLIST FUNCTION STORED
      this.subReloadOne = this.reloadService.refreshWishList$.subscribe(() => {
        this.getWishListByUser();
      });
      this.getWishListByUser();

    console.log('data',this.product?.zone[0]?.name)
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



  @ViewChild('zoomViewer', {static: true}) zoomViewer;
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
        zoom.style.height = `${100}%`;
        zoom.style.width = `${100}%`;
      }
    }
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
    this.wishlist = this.wishlists.find(f => (f.product as Product)?._id === this.product?._id);
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



  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

 /**
   * Dialog Component
   * openAddressDialog()
   */
 openReviewDialog(data:Product) {
  console.log('data',data);
  
  this.router.navigate([], { queryParams: { dialogOpen: true }, queryParamsHandling: 'merge' });
  this.reloadService.needRefreshData$();
  const dialogRef = this.dialog.open(ProductReportComponent, {
    panelClass: ['theme-dialog'],
    width: '100%',
    maxWidth: '550px',
    maxHeight: '100%',
    autoFocus: false,
    disableClose: false,
    data: this.product,
  });

  dialogRef.afterClosed().subscribe((dialogResult) => {
    if (dialogResult) {
      dialogRef.close(dialogResult);
      this.router.navigate([], { queryParams: { dialogOpen: null }, queryParamsHandling: 'merge' });
    }
  });
}


}
