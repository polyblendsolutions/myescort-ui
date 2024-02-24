import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/common/category.interface';
import { Division } from 'src/app/interfaces/common/division.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { CategoryService } from 'src/app/services/common/category.service';
import { DivisionService } from 'src/app/services/common/division.service';
import { UiService } from 'src/app/services/core/ui.service';
import {Area} from "../../../interfaces/common/area.interface";
import {AreaService} from "../../../services/common/area.service";

@Component({
  selector: 'app-home-popular-category',
  templateUrl: './home-popular-category.component.html',
  styleUrls: ['./home-popular-category.component.scss']
})
export class HomePopularCategoryComponent implements OnInit {

  categorys: Category[] = [];
  divisions: Division[] = [];
  area: Area[] = [];
    // Subscriptions

    private subParamp: Subscription;
    private subDataTwo: Subscription;
    private subDivisionData: Subscription;
    private subAreaData: Subscription;

    constructor(
      private uiService: UiService,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private divisionService: DivisionService,
      private areaService: AreaService,

    ) {}

    ngOnInit(): void {
      // this.subParamp = this.activatedRoute.queryParamMap.subscribe((res) => {
      //   this.id = res.get('id');
      //   if (this.id) {
      //     this.showCreate = true;
      //     this.showAll = true;
      //     this.getSingleProductById(this.id);
      //   }
      // });
      // Base Data
      this.getAllCategory();
      this.getAllDivision();
      this.getAllArea();
    }

    private getAllDivision() {
      let mSelect = {
        name: 1,
        slug: 1,
      };
      const filter: FilterData = {
        filter: { status: 'publish' },
        select: mSelect,
        pagination: null,
        sort: { createdAt: -1 },
      };

      this.subDivisionData = this.divisionService
        .getAllDivisions(filter)
        .subscribe(
          (res) => {
            if (res.success) {
              this.divisions = res.data;
            }
          },
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
    }
  private getAllArea() {
    let mSelect = {
      name: 1,
      slug: 1,
    };
    const filter: FilterData = {
      filter: { status: 'publish' },
      select: mSelect,
      pagination: null,
      sort: { createdAt: -1 },
    };

    this.subDivisionData = this.areaService
      .getAllAreas(filter)
      .subscribe(
        (res) => {
          if (res.success) {
            this.area = res.data;
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
  }


  private getAllCategory() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataTwo = this.categoryService
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
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }
}
