import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  /* GET ACCOUNT CARD DATA */
  @Input() accountCard: any;

  constructor() {

  }

  ngOnInit(): void {

  }

}
