import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { subscriptionDetail } from 'src/app/interfaces/common/subscription.interface';
import { User } from 'src/app/interfaces/common/user.interface';
import { SubscriptionService } from 'src/app/services/common/subscription.service';
import { UserDataService } from 'src/app/services/common/user-data.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit{
constructor(public SubscriptionService:SubscriptionService,
  public userDataService: UserDataService

){}
  public subSubscriptionDetails:Subscription;
  public subscriptionDetails: subscriptionDetail
  public subLoggedInUserData: Subscription
  public user: User
  public activeSubscription: subscriptionDetail
  
  ngOnInit(): void {
   this.getLoggedInUserData();
  
}  
 getLoggedInUserData() {
  this.subLoggedInUserData= this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
          console.log('user', this.user);
          this.getSubscriptionDetails();
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  getSubscriptionDetails() {
    this.subSubscriptionDetails= this.SubscriptionService.getAllSubscription().subscribe(
        (res) => {
          if (res) {
            this.subscriptionDetails=res.data;

            // if (this.user?.subscriptionId) {
            //   this.activeSubscription = res.data.filter((subscription) => {
            //    return subscription._id === this.user.subscriptionId;
            //   });
            // }
            console.log('this.subscriptionDetails', this.subscriptionDetails)
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      )
    }

    buyVip(subscriptionId:string){
     this.SubscriptionService.buyVipSubscription(this.user._id, subscriptionId).subscribe(
      (res) => {
        if (res) {
          console.log('this.apisub-res', res)
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
    }
}
