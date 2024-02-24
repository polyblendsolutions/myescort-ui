import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-top-section',
  templateUrl: './page-top-section.component.html',
  styleUrls: ['./page-top-section.component.scss']
})
export class PageTopSectionComponent {

  /* Get page top section title */
  @Input() titleData: string;

}
