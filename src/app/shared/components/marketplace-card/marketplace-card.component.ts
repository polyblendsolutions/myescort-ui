import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/common/product.interface';
import { QuickViewDialogComponent } from './quick-view-dialog/quick-view-dialog.component';
import {User} from "../../../interfaces/common/user.interface";
import {UserDataService} from "../../../services/common/user-data.service";
import {ReloadService} from "../../../services/core/reload.service";
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
  user: User;

  imgPlaceHolder = "/assets/images/png/fallbackImage.png";

  //Subscription
  private subUserData: Subscription;
  private subRealod:Subscription;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userDataService: UserDataService,
    private reloadService:ReloadService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    //Reload Data
    this.subRealod = this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserData();
    })
    //Base Data
    this.getLoggedInUserData();
    this.tesData = this.data?.name?.split(',')[0];
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
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  onClickToPrepopulate(id){

    if(this.isOutputEventEmission){

    this.productService.getProductById(id).subscribe(
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


}
