import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/common/blog';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { BlogService } from 'src/app/services/common/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit,OnDestroy {

  // Store Data
  blogs!: Blog[];
  isLoading = false;
  filter: any = null;

  //SUBSCRIPTION
  private subDataOne:Subscription;


  constructor(
    private blogService: BlogService,
  ) {

  }

  ngOnInit(): void {
    this.getAllBlog();
  }

  /**
   * HTTP REQUEST HANDLE
   * getAllBlog()
   */

  private getAllBlog() {
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      description: 1,
      createdAt: 1,
      blogType: 1,
      seoTitle: 1,
      bannerImage: 1,
      userImage: 1,
      priority:1,
      userName:1,
      userDesignation:1,
      isHtml:1,
      keyWord:1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { priority: -1 },
    };

    this.isLoading = true;

    this.subDataOne = this.blogService.getAllBlog(filter,null).subscribe(
        (res) => {
              if(res){
                    this.blogs = res.data;
                    this.isLoading = false;
              }
        },
        (err) => {
             if(err){
                 console.log(err);
             }
        }
    )
    
  }

  /***
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
       if(this.subDataOne){
          this.subDataOne.unsubscribe();
       }
  }


}
