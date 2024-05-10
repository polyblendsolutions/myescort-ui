import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { ProductService } from 'src/app/services/common/product.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from '../../../services/core/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog-view/confirm-dialog/confirm-dialog.component';
import { User } from '../../../interfaces/common/user.interface';
import { UserDataService } from '../../../services/common/user-data.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit, OnDestroy {
  /* GET LIST CARD DATA */
  @Input() data?: Product;
  user: User;
  isLoading: boolean = false;

  //Subscriptions
  private subDataOne: Subscription;
  //Subscription
  private subUserData: Subscription;
  private subRealod: Subscription;
  constructor(
    private productService: ProductService,
    private uiService: UiService,
    private dialog: MatDialog,
    private userDataService: UserDataService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    //Reload Data
    this.subRealod = this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserData();
    });
    //Base Data
    this.getLoggedInUserData();
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
          // console.log(err);
        }
      }
    );
  }
  /**
   * HTTP REQUEST HANDLE
   * deleteProductByUser()
   */
  private updateUserProductById(id: string, data: any) {
    this.isLoading = true;
    this.subDataOne = this.productService
      .updateUserProductById(id, data)
      .subscribe(
        (res) => {
          if (res.success) {
            this.uiService.success(res.message);
            this.reloadService.needRefreshData$();
            this.isLoading = false;
          }
        },
        (err) => {
          this.isLoading = false;
          // console.log(err);
        }
      );
  }

  deleteProductByUser(id: string) {
    this.subDataOne = this.productService.deleteProductByUserId(id).subscribe(
      (res) => {
        if (res.success) {
          this.reloadService.needRefreshData$();
        }
      },
      (err) => {
        if (err) {
          // console.log(err);
        }
      }
    );
  }

  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   */
  public openConfirmDialog(type: 'publish' | 'draft') {
    switch (type) {
      case 'publish': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Aktivering af annonce',
            message: 'Er du sikker, at du vil activere din annonce?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.onToggle('publish');
          }
        });
        break;
      }

      case 'draft': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '420px',
          data: {
            title: 'Deaktivering af annonce',
            message: 'Er du sikker, at du vil deaktivere din annonce?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.onToggle('draft');
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * ON Togol
   *
   */

  onToggle(type: 'draft' | 'publish') {
    this.updateUserProductById(this.data?._id, { status: type });
  }

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

  bump() {
    this.isLoading = true;
    this.productService.bumpProductById(this.data._id).subscribe(response => {
      if (response.success) {
        this.uiService.success(response.message);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })
  }
}
