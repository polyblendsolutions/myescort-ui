import { Component, Input, ViewChild } from '@angular/core';
import { AccountSidebarComponent } from '../account-sidebar/account-sidebar.component';

@Component({
  selector: 'app-account-top-section',
  templateUrl: './account-top-section.component.html',
  styleUrls: ['./account-top-section.component.scss'],
})
export class AccountTopSectionComponent {
  @ViewChild('accountSlider') accountSlider: AccountSidebarComponent;

  @Input() title?:string

  onShowSideBar() {
    this.accountSlider.onSLiderShow();
  }
}
