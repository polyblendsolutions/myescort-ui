import { Component, Input } from '@angular/core';
import { spotPageDetails } from 'src/app/interfaces/common/spot.interface';

@Component({
  selector: 'app-spot-search-area',
  templateUrl: './spot-search-area.component.html',
  styleUrls: ['./spot-search-area.component.scss']
})
export class SpotSearchAreaComponent{
  @Input() pageData: spotPageDetails;
  advanchFilter = false;

  onHideFilter() {
    this.advanchFilter = !this.advanchFilter;
  }

}
