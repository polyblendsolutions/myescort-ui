import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/common/user.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { UserService } from 'src/app/services/common/user.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
})
export class AccountSidebarComponent implements OnInit {
  sliderShow: boolean = false;
  user: User = null;

  isLoading: boolean = false;
  isVerify: boolean = true;
  verified: String = 'Unverified';

  constructor(
    protected userDataService: UserDataService,
    private userService: UserService,
    private reloadService: ReloadService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    //Reload Data
    this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserData();
    });
    //Base Data
    this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
          if (this.user.isVerfied === true) {
            this.isVerify = false;
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

  onLogout() {
    this.userService.userLogOut();
    this.sliderShow = false;
  }

  onSLiderShow() {
    this.sliderShow = !this.sliderShow;
  }
}
