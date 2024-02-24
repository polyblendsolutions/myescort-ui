import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxTypedJsModule } from "ngx-typed-js";
import { CategoryCardModule } from 'src/app/shared/components/category-card/category-card.module';
import { MarketplaceCardModule } from 'src/app/shared/components/marketplace-card/marketplace-card.module';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from "../../material/material.module";
import { AllAdsCategoryComponent } from './all-ads-category/all-ads-category.component';
import { AppProductAreaComponent } from './app-product-area/app-product-area.component';
import { CategoryAreaComponent } from './category-area/category-area.component';
import { HomePopularCategoryComponent } from './home-popular-category/home-popular-category.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProcessDirectionComponent } from './process-direction/process-direction.component';
import { SectionOneComponent } from './section-one/section-one.component';
import { SmallBannerComponent } from './small-banner/small-banner.component';


@NgModule({
  declarations: [
    HomeComponent,
    SectionOneComponent,
    CategoryAreaComponent,
    AllAdsCategoryComponent,
    ProcessDirectionComponent,
    SmallBannerComponent,
    AppProductAreaComponent,
    HomePopularCategoryComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MarketplaceCardModule,
    CategoryCardModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxTypedJsModule,
    SwiperModule,
    FormsModule,
  ]
})
export class HomeModule {
}
