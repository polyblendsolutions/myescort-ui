import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Category } from 'src/app/interfaces/common/category.interface';
import { Division } from 'src/app/interfaces/common/division.interface';
import { Type } from 'src/app/interfaces/common/type.interface';
import { CategoryService } from 'src/app/services/common/category.service';
import { TypeService } from 'src/app/services/common/type.service';
import { DivisionService } from 'src/app/services/common/division.service';
import { Router } from '@angular/router';
import { FilterData } from 'src/app/interfaces/core/filter-data';

@Component({
  selector: 'app-aarhus-search-area',
  templateUrl: './aarhus-search-area.component.html',
  styleUrls: ['./aarhus-search-area.component.scss'],
})
export class AarhusSearchAreaComponent implements OnInit, OnDestroy {
  @Input() titleData: string;
  data: any;
  // store data
  types: Type[] = [];
  categorys: Category[] = [];
  id?: string;
  divisions: Division[];

  advanchFilter = false;

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDivisionData: Subscription;

  constructor(
    private categoryService: CategoryService,
    private typeService: TypeService,
    private divisionService: DivisionService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    console.log(this.router.url);
    this.data = this.router.url;
    this.initDataForm();
    this.getAllCategory();
    this.getAllType();
    this.getAllDivision();
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      location: [null],
      category: [null],
      type: [null],
    });
  }

  onSubmit() {
    this.router.navigate(['/ads'], {
      queryParams: {
        categories: this.dataForm.value.category,
        types: this.dataForm.value.type,
        divisions: this.dataForm.value.location,
      },
      queryParamsHandling: '',
    });
  }

  /**
   * HTTP REQ HANDLE
   * getAllType()
   * getAllDivision();
   */

  private getAllType() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.typeService.getAllType(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.types = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
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
      sort: { createdAt: -1 },
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

  private getAllDivision() {
    let mSelect = {
      name: 1,
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

  onHideFilter() {
    this.advanchFilter = !this.advanchFilter;
  }

  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
  }
}
