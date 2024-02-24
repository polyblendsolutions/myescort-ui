import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/interfaces/common/blog';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { BlogService } from 'src/app/services/common/blog.service';
import { SocialShareComponent } from 'src/app/shared/components/ui/social-share/social-share.component';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  //Store Data
  blogs: Blog[];
  blog: Blog;
  id: string | any;
  starPoint = 0;
  endPoint = 0;

  //Subscription
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    //GET PARAMP
    this.activatedRoute.paramMap.subscribe((res) => {
      if (res.get('id')) {
        this.id = res.get('id');
        this.getBlogById(this.id, null);
      }
    })

    //BASE DATA
    this.getAllRelatedBlogs();
  }

  /**
   * HTTP REQUEST HANDLE
   * getBlogById()
   * getAllRelatedBlogs()
   */
  getBlogById(id: string, select: string) {
    this.subDataOne = this.blogService.getBlogById(id, select).subscribe((res) => {
      if (res) {
        this.blog = res.data;
        console.log(res);
      }
    }, (err) => {
      if (err) {
        console.log(err);
      }
    }
    )
  }

  getAllRelatedBlogs() {
    const mSelect = {
      name: 1,
      image: 1,
      description: 1,
      createdAt: 1,
      blogType: 1,
      shortDescription: 1,
      seoTitle: 1,
      bannerImage: 1,
      userImage: 1,
      userName: 1,
      userDesignation: 1,
      isHtml: 1,
      keyWord: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { priority: -1 },
    };
    this.subDataTwo = this.blogService.getAllBlog(filter, null).subscribe((res) => {
      if (res) {
        this.blogs = res.data;
        console.log(this.blogs);
        this.starPoint = Math.floor(Math.random() * this.blogs.length);
        this.endPoint = this.starPoint + 3;
        console.log(this.starPoint, this.endPoint);
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )



  }

  openDialog() {
    this.dialog.open(SocialShareComponent, {
      data: this.blog,
      maxWidth: "480px",
      width: "100%",
      height: "auto",
      panelClass: ['social-share', 'social-dialog']
    })
  }

  /**
   * ON DESTROY ALL SUBSCRPTIONS
   */

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }

}
