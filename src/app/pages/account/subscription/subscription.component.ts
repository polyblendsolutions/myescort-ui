import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { SubscriptionDetails } from 'src/app/interfaces/common/subscription.interface';
import { User } from 'src/app/interfaces/common/user.interface';
import { SubscriptionService } from 'src/app/services/common/subscription.service';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  constructor(
    public SubscriptionService: SubscriptionService,
    public userDataService: UserDataService,
    private uiService: UiService,
  ) { }
  
  public subSubscriptionDetails: Subscription;
  public subLoggedInUserData: Subscription;
  public subscriptionDetails: SubscriptionDetails[];
  public user: User;
  public activeSubscription: SubscriptionDetails[];

  ngOnInit(): void {
    this.getLoggedInUserData();
  }
  
  getLoggedInUserData() {
    this.subLoggedInUserData = this.userDataService
      .getLoggedInUserData()
      .subscribe(
        (res) => {
          if (res) {
            this.user = res.data;
            this.getSubscriptionDetails();
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
  }

  checkExistingSubscription(data: SubscriptionDetails[]) {
    this.activeSubscription = data.filter((subscription) => {
      return subscription._id === this.user.subscriptionId;
    });
  }

  getSubscriptionDetails() {
    this.subSubscriptionDetails =
      this.SubscriptionService.getAllSubscription().subscribe(
        (res) => {
          if (res) {
            this.subscriptionDetails = res.data;
            if (this.user?.subscriptionId) {
              this.checkExistingSubscription(this.subscriptionDetails);
            }
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
  }

  buyVip(subscriptionId: string) {
    this.SubscriptionService
    .buyVipSubscription(
      this.user._id,
      subscriptionId
    ).pipe(take(1)).subscribe(
      (res) => {
          if (res?.success) {
            this.uiService.success(res.message);
            this.getLoggedInUserData();
          } else if (!res?.success) {
            this.uiService.wrong(res.message);
          }
        },
        (error) => {
          // Handle error
          this.uiService.wrong(error?.error?.message)
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subSubscriptionDetails) {
      this.subSubscriptionDetails.unsubscribe();
    }
    if (this.subLoggedInUserData) {
      this.subLoggedInUserData.unsubscribe();
    }
  }
}
