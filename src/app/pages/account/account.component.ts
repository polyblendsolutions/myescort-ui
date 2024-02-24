import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/common/user.interface";
import {UserService} from "../../services/common/user.service";
import {UserDataService} from "../../services/common/user-data.service";
import {ReloadService} from "../../services/core/reload.service";
import {UiService} from "../../services/core/ui.service";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  user: User = null;

  isLoading: boolean = false;
  isVerify: boolean = true;
  verified: String = "Unverified"

  constructor(
    protected userDataService: UserDataService,
    private userService: UserService,
    private reloadService:ReloadService,
    private uiService: UiService,
  ) {
  }

  ngOnInit(): void {

    //Reload Data
     this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserData();
    })
    //Base Data
    this.getLoggedInUserData();


  }



  getLoggedInUserData() {
  this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
         if(this.user.isVerfied === true){
           this.isVerify = false
         }
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  onLogout() {
    this.userService.userLogOut();
  }

  accountCard: any = [
    {
      route: '/account/profile',
      bgColor: '#ebdeef',
      color: '#7c2b94',
      titleText: 'Profile',
      btnText: 'Go to Profile',
      iconClass: 'fa-solid fa-user'
    },
    {
      route: '/account/my-list',
      bgColor: '#ebdeef',
      color: '#7c2b94',
      titleText: 'List',
      btnText: 'Go to List',
      iconClass: 'fa-solid fa-list'
    },
    {
      route: '/account/wishlist',
      bgColor: '#E9F5E9',
      color: '#20AD20',
      titleText: 'Favorite',
      btnText: 'Go to Favorite',
      iconClass: 'fa-solid fa-heart'
    },
    {
      route: '/coming-soon',
      bgColor: '#E9F5E9',
      color: '#20AD20',
      titleText: 'Payment',
      btnText: 'Go to Payment',
      iconClass: 'fa-solid fa-credit-card'
    },
    // {
    //   route: '/account/account-details',
    //   bgColor: '#DFEFEF',
    //   color: '#288887',
    //   titleText: 'Account Details',
    //   btnText: 'Go to Account Details',
    //   iconClass: 'fa-solid fa-file-invoice'
    // },
  ];

  /**
   * ON Togol
   *
   */

  onToggle(type: 'draft' | 'publish') {
    // this.updateUserProductById(this.data?._id, {status: type})
  }

  onVerified() {
    // console.log("thiiii",this.user)

    const mData = {
      isVerfied:false,
      verify:true,
    }

     this.userService
      .updateUsersById(this.user._id,mData )
      .subscribe({
        next: (res) => {

          if (res.success) {

            this.uiService.success(res.message);

          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {

          console.log(error);
        },
      });


  }


}
