import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/common/header.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private _headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    /**
     * Get behavior subject data.
    */
    this._headerService.headerColorChange.next(false);
  }

  ngOnDestroy(): void {
    /**
     * Set behavior subject data.
    */
    this._headerService.headerColorChange.next(true);

  }



}
