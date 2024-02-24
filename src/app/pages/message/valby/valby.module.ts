import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValbyRoutingModule } from './valby-routing.module';
import { ValbyComponent } from './valby.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { ProductListRightComponent } from './product-list-right/product-list-right.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FeatureCardModule} from "../../../shared/components/feature-card/feature-card.module";
import {PageTopSectionModule} from "../../../shared/components/page-top-section/page-top-section.module";
import {ProductListModule} from "../../product-list/product-list.module";
import {SearchFilterModule} from "../../../shared/components/search-filter/search-filter.module";


@NgModule({
  declarations: [
    ValbyComponent,
    FilterAreaComponent,
    ProductListRightComponent
  ],
  imports: [
    CommonModule,
    ValbyRoutingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FeatureCardModule,
    PageTopSectionModule,
    ProductListModule,
    SearchFilterModule
  ]
})
export class ValbyModule { }
