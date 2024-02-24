import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FilterData} from "../../../interfaces/core/filter-data";
import {Banner} from "../../../interfaces/common/banner.interface";
import {BannerService} from "../../../services/common/banner.service";

@Component({
  selector: 'app-small-banner',
  templateUrl: './small-banner.component.html',
  styleUrls: ['./small-banner.component.scss']
})
export class SmallBannerComponent implements OnInit, OnDestroy {

  // store data
  banners: Banner[] = [];


  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private bannerService: BannerService,
  ) {
  }


  ngOnInit(): void {
    this.getAllBanner();
  }


  /**
   * HTTP REQ HANDLE
   * getAllBanner()
   * deleteMultipleBannerById()
   */

  private getAllBanner() {
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      mobileImage: 1,
      createdAt: 1,
      bannerType: 1,
      url: 1,
    };

    const filter: FilterData = {
      filter: {bannerType: "homePageTopSmallBanner"},
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    this.subDataOne = this.bannerService.getAllBanner(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.banners = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }


}
