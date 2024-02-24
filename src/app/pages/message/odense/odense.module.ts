import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdenseRoutingModule } from './odense-routing.module';
import { OdenseComponent } from './odense.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { ProductListRightComponent } from './product-list-right/product-list-right.component';
import {PageTopSectionModule} from "../../../shared/components/page-top-section/page-top-section.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ProductListModule} from "../../product-list/product-list.module";
import {MarketplaceCardModule} from "../../../shared/components/marketplace-card/marketplace-card.module";
import {FeatureCardModule} from "../../../shared/components/feature-card/feature-card.module";
import { OdenseSearchAreaComponent } from './odense-search-area/odense-search-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SearchFilterModule} from "../../../shared/components/search-filter/search-filter.module";

@NgModule({
  declarations: [
    OdenseComponent,
    FilterAreaComponent,
    ProductListRightComponent,
    OdenseSearchAreaComponent,
  ],
  imports: [
    CommonModule,
    OdenseRoutingModule,
    PageTopSectionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ProductListModule,
    MarketplaceCardModule,
    FeatureCardModule,
    ReactiveFormsModule,
    SearchFilterModule
  ],
})
export class OdenseModule {}
