import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotRoutingModule } from './spot-routing.module';
import { SpotListComponent } from './spot-list/spot-list.component';
import { SpotSearchAreaComponent } from './spot-search-area/spot-search-area.component';
import { SpotComponent } from './spot/spot.component';
import { SearchFilterModule } from 'src/app/shared/components/search-filter/search-filter.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductListModule } from '../product-list/product-list.module';
import { MarketplaceCardModule } from 'src/app/shared/components/marketplace-card/marketplace-card.module';
import { FeatureCardModule } from 'src/app/shared/components/feature-card/feature-card.module';
import { SearchAreaModule } from 'src/app/shared/components/search-area/search-area.module';


@NgModule({
  declarations: [
    SpotListComponent,
    SpotSearchAreaComponent,
    SpotComponent,
  ],
  imports: [
    CommonModule,
    SpotRoutingModule,
    SearchFilterModule,
    PageTopSectionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MarketplaceCardModule,
    FeatureCardModule,
    ProductListModule,
    SearchAreaModule
  ]
})
export class SpotModule { }
