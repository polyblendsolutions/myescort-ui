import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/common/product.interface';
import { QuickViewDialogComponent } from './quick-view-dialog/quick-view-dialog.component';
import {Subscription} from "rxjs";
import { ProductService } from 'src/app/services/common/product.service';

@Component({
  selector: 'app-marketplace-card',
  templateUrl: './marketplace-card.component.html',
  styleUrls: ['./marketplace-card.component.scss'],
})
export class MarketplaceCardComponent implements OnInit {
  @Input() data?: Product;
  @Input() isOutputEventEmission?: boolean;
  @Output() onClickCard = new EventEmitter<any>();
  tesData: any;
  isQaHover: boolean = false;

  /***
   * Subscription
   */
  private subProductById: Subscription;

  imgPlaceHolder = "/assets/images/png/fallbackImage.png";

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.tesData = this.data?.name?.split(',')[0];
  }
  /***
   * HTTP REQUEST HANDLE
   */

  onClickToPrepopulate(id){

    if(this.isOutputEventEmission){

      this.subProductById= this.productService.getProductById(id).subscribe(
      (res) => {
        if (res.success) {
          this.onClickCard.emit(res.data);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );}else{
      this.router.navigate(['/ad-details', this.data?._id]);
    }
  }

  public openComponentDialog(id?: string) {
    this.dialog.open(QuickViewDialogComponent, {
      data: id,
      panelClass: ['theme-dialog', 'full-screen-modal'],
      autoFocus: false,
      disableClose: false,
    });
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subProductById) {
      this.subProductById.unsubscribe();
    }
  }

  onImageError(event: any, path) {
    event.target.src = path.replace('preview', 'images')
  }
}
