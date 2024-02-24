import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductDetailsImaaeAreaComponent } from './product-details-imaae-area/product-details-image-area.component';

import { MarketplaceCardModule } from 'src/app/shared/components/marketplace-card/marketplace-card.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { SwiperModule } from 'swiper/angular';
import { ProductDetailsInfoComponent } from './product-details-info/product-details-info.component';
import { ProductDetailsRightAreaComponent } from './product-details-right-area/product-details-right-area.component';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { SelectDaysComponent } from './select-days/select-days.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { RelatedProductsComponent } from './related-products/related-products.component';
import {SharedModule} from "../../shared/shared.module";
import {NgxImageZoomModule} from "ngx-image-zoom";
import {NgxWatermarkModule} from "ngx-watermark";
import { ProductDetailsPricingComponent } from './product-details-pricing/product-details-pricing.component';
import { RatingAndReviewComponent } from './rating-and-review/rating-and-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductReportComponent } from './product-report/product-report.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductDetailsImaaeAreaComponent,
    ProductDetailsRightAreaComponent,
    ProductDetailsInfoComponent,
    SelectDaysComponent,
    RelatedProductsComponent,
    ProductDetailsPricingComponent,
    RatingAndReviewComponent,
    ProductReportComponent,
  ],
    imports: [
        CommonModule,
        ProductDetailsRoutingModule,
        SwiperModule,
        PageTopSectionModule,
        MarketplaceCardModule,
        PipesModule,
        SharedModule,
        NgxImageZoomModule,
        ReactiveFormsModule,
        NgxWatermarkModule,
        MaterialModule
    ]
})
export class ProductDetailsModule { }
