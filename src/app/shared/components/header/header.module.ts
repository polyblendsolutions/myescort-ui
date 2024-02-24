import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import {OpenDalogComponent} from "./open-dalog/open-dalog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../../../material/material.module";



@NgModule({
  declarations: [
    HeaderComponent,
    OpenDalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
