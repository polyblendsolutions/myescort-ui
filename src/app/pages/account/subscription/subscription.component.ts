import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { subscriptionDetail } from 'src/app/interfaces/common/subscription.interface';
import { SubscriptionService } from 'src/app/services/common/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit{
constructor(public SubscriptionService:SubscriptionService){}
  public subSubscriptionDetails:Subscription;
  public subscriptionDetails: subscriptionDetail
  
  ngOnInit(): void {
   this.getLoggedInUserData();
}  
  getLoggedInUserData() {
    this.subSubscriptionDetails= this.SubscriptionService.getAllSubscription().subscribe(
        (res) => {
          if (res) {
            this.subscriptionDetails = res.data;
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

    buyVip(id:string){
     console.log('subscription ID', id)
    }
}
