import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { BlogCardLoaderModule } from 'src/app/shared/components/loader/blog-card-loader/blog-card-loader.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { BlogPageTopSectionComponent } from './blog-page-top-section/blog-page-top-section.component';


@NgModule({
  declarations: [
    BlogsComponent,
    BlogPageTopSectionComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    BlogCardLoaderModule,
    PageTopSectionModule
  ]
})
export class BlogsModule { }
