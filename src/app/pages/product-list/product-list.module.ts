import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MarketplaceCardModule } from 'src/app/shared/components/marketplace-card/marketplace-card.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '../../material/material.module';
import { AllAdsCategoryComponent } from './all-ads-category/all-ads-category.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { ProductListRightComponent } from './product-list-right/product-list-right.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { SearchFilterModule } from 'src/app/shared/components/search-filter/search-filter.module';

@NgModule({
  declarations: [
    ProductListComponent,
    FilterAreaComponent,
    ProductListRightComponent,
    SearchAreaComponent,
    AllAdsCategoryComponent,
  ],
  exports: [SearchAreaComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    MatRadioModule,
    MatCheckboxModule,
    MarketplaceCardModule,
    PageTopSectionModule,
    MatMenuModule,
    ReactiveFormsModule,
    MaterialModule,
    SwiperModule,
    MatSliderModule,
    MaterialModule,
    FormsModule,
    SearchFilterModule
  ],
})
export class ProductListModule {}
