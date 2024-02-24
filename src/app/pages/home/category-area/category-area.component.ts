import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/common/category.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { CategoryService } from 'src/app/services/common/category.service';

@Component({
  selector: 'app-category-area',
  templateUrl: './category-area.component.html',
  styleUrls: ['./category-area.component.scss']
})
export class CategoryAreaComponent {
// store data
categorys: Category[] = [];

// Subscriptions
private subDataOne: Subscription;
private subDivisionData:Subscription;

constructor(
  private categoryService: CategoryService,
) { }


ngOnInit(): void {
  this.getAllCategory();
}

/**
 * HTTP REQ HANDLE
 * getAllCategory()
 */


private getAllCategory() {
  // Select
  const mSelect = {
    name: 1,
    image: 1,
    slug:1,
    mobileImage: 1,
    serial: 1,
    status: 1,
  };

  const filter: FilterData = {
    filter: null,
    pagination: null,
    select: mSelect,
    sort: {createdAt: -1},
  };

  this.subDataOne = this.categoryService
    .getAllCategory(filter, null)
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.categorys = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
}





  /**
 * ON DESTROY ALL SUBSCRIPTIONS
 */
  ngOnDestroy(): void {
    if(this.subDataOne){
     this.subDataOne.unsubscribe();
    }
    if(this.subDivisionData){
     this.subDivisionData.unsubscribe();
    }
 }
}
