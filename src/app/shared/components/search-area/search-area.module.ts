import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAreaComponent } from './search-area.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {NgxTypedJsModule} from "ngx-typed-js";
import {SwiperModule} from "swiper/angular";



@NgModule({
  declarations: [
    SearchAreaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxTypedJsModule,
    SwiperModule,
    FormsModule,
  ],
  exports:[
    SearchAreaComponent
  ]
})
export class SearchAreaModule { }
