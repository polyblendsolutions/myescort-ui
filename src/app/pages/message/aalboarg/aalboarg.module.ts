import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AalboargRoutingModule } from './aalboarg-routing.module';
import { AalboargComponent } from './aalboarg.component';
import {PageTopSectionModule} from "../../../shared/components/page-top-section/page-top-section.module";
import {ProductListModule} from "../../product-list/product-list.module";
import { FilterAreaComponent } from './filter-area/filter-area.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ProductListRightComponent } from './product-list-right/product-list-right.component';
import {MarketplaceCardModule} from "../../../shared/components/marketplace-card/marketplace-card.module";
import {FeatureCardModule} from "../../../shared/components/feature-card/feature-card.module";
import { AalboargSearchAreaComponent } from './aalboarg-search-area/aalboarg-search-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SearchAreaModule} from "../../../shared/components/search-area/search-area.module";
import {SearchFilterModule} from "../../../shared/components/search-filter/search-filter.module";

@NgModule({
  declarations: [
    AalboargComponent,
    FilterAreaComponent,
    ProductListRightComponent,
    AalboargSearchAreaComponent,
  ],
  imports: [
    CommonModule,
    AalboargRoutingModule,
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
export class AalboargModule {}
