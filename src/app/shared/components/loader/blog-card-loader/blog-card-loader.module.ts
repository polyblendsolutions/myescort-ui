import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardLoaderComponent } from './blog-card-loader.component';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    BlogCardLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule
  ],
  exports:[
    BlogCardLoaderComponent
  ]
})
export class BlogCardLoaderModule { }
