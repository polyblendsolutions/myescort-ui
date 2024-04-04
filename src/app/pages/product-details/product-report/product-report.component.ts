import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/interfaces/common/report.interface';
import { ReportService } from 'src/app/services/common/report.service';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { UserService } from 'src/app/services/common/user.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { UtilsService } from 'src/app/services/core/utils.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit, OnDestroy {

  // Rating
  @Input() pageUrl: string = null;
  @Input() productId: string = null;
  @Input() rating = 0;



  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  report?: Report;
  // Image Upload
  files: File[] = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImage: string;

  // Subscriptions
  private subAddReport: Subscription;
  private subRemoveSingleFile: Subscription;
  private subUploadMultiImage: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fileUploadService: FileUploadService,
    public userDataService: UserDataService,
    public reloadService: ReloadService,
    public utilsService: UtilsService,
    public reportService: ReportService,
    public dialogRef: MatDialogRef<ProductReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    // Init Form
    this.initDataForm();
    this.id = this.data?._id
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      user: [null],
      product: [null],
      userName: [null],
      report: [null],
      rating: [null],
      reportDate: [null],
      replyDate: [null],
      status: false,
      like: 0,
      dislike: 0,
      images: null,

    });
  }





  onRatingChanged(rating) {
    this.rating = rating;
  }


  onSubmit() {
    if (this.dataForm.invalid) {

      this.uiService.warn('Udfyld venligst det påkrævede felt.');
      return;
    }
    // if (!this.rating && this.rating <= 0) {

    //   this.uiService.warn('Please select your report');
    //   return;
    // }
      // if (this.report) {
      //   if (this.files && this.files.length) {
      //     this.updateCategoryWithImage();
      //   } else {
      //     this.updateCategoryById();
      //   }
    // }
    else {
      if (this.files && this.files.length) {
        this.addReportWithImage();
      } else {
        this.addReport();
      }
    }
  }



  /**
   * RESET
   */
  private reset() {
    this.rating = 0;
    // this.formElRef.resetForm();
  }

  /**
   * HTTP REQ HANDLE
   * getCategoryById()
   * addCategory()
   * updateCategoryById()
   * removeSingleFile()
   */

  private addReport() {

    const mData = {
      ...this.dataForm.value,
      ...{
        rating: this.rating,
        reportDate: this.utilsService.getDateString(new Date()),
        product:  this.id,
      }
    }

    this.subAddReport = this.reportService.addReport(mData)
      .subscribe({
        next: (res => {
          this.uiService.success('Anmodningen behandles.');
          this.reloadService.needRefreshData$();
          this.reset();
          this.files=[];
          this.dialogRef.close();
        }),
        error: (error => {
          console.log(error);
        })
      });
  }





  private removeSingleFile(data: string) {
    this.subRemoveSingleFile = this.fileUploadService.removeSingleFile(data).subscribe({
      next: (res) => {
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * IMAGE UPLOAD
   * onSelect()
   * onRemove()
   * addCategoryWithImage()
   * updateCategoryWithImage()
   * removeSelectImage()
   * removeOldImage()
   */

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private addReportWithImage() {
    this.subUploadMultiImage = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        this.dataForm.patchValue({ images: images });
        this.addReport();
      });
  }



  // removeSelectImage(index: number) {
  //   if (this.files && this.files.length) {
  //     this.files.splice(index - this.oldImages.length, 1);
  //     this.pickedImage.splice(index, 1);
  //   } else {
  //     this.oldImages.splice(index, 1);
  //     this.pickedImage.splice(index, 1);
  //   }
  // }

  removeOldImage(index: number) {
    this.removeImage = this.oldImages[index];
    this.oldImages.splice(index, 1);
    this.dataForm.patchValue({ image: null });
  }




  /**
   * ON DESTROY
   * ngOnDestroy()
   */

  ngOnDestroy() {
    if (this.subAddReport) {
      this.subAddReport.unsubscribe();
    }
    if (this.subRemoveSingleFile) {
      this.subRemoveSingleFile.unsubscribe();
    }
    if (this.subUploadMultiImage) {
      this.subUploadMultiImage.unsubscribe();
    }
  }

}
