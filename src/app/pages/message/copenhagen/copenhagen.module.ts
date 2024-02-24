import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CopenhagenRoutingModule } from './copenhagen-routing.module';
import { CopenhagenComponent } from './copenhagen.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { ProductListRightComponent } from './product-list-right/product-list-right.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FeatureCardModule} from "../../../shared/components/feature-card/feature-card.module";
import {PageTopSectionModule} from "../../../shared/components/page-top-section/page-top-section.module";
import {ProductListModule} from "../../product-list/product-list.module";
import { CopenhagenSearchAreaComponent } from './copenhagen-search-area/copenhagen-search-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SearchFilterModule} from "../../../shared/components/search-filter/search-filter.module";

@NgModule({
  declarations: [
    CopenhagenComponent,
    FilterAreaComponent,
    ProductListRightComponent,
    CopenhagenSearchAreaComponent,
  ],
  imports: [
    CommonModule,
    CopenhagenRoutingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FeatureCardModule,
    PageTopSectionModule,
    ProductListModule,
    ReactiveFormsModule,
    SearchFilterModule
  ],
})
export class CopenhagenModule {}
