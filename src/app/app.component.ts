import { Component, OnInit } from '@angular/core';
import {UserService} from './services/common/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) {
    this.userService.autoUserLoggedIn();
  }

  ngOnInit() {
  }

}
