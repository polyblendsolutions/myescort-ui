import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/common/user.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { UserService } from 'src/app/services/common/user.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

@Component({
  selector: 'app-profile-varification',
  templateUrl: './profile-varification.component.html',
  styleUrls: ['./profile-varification.component.scss'],
})
export class ProfileVarificationComponent implements OnInit{
  // Image
  files: File[] | any = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImages: string[] = [];
  user: User = null;
 //Form Variables
 dataForm!: FormGroup;
  // Subscriptions
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;

  constructor(
    private uiService: UiService,
    private fb: FormBuilder,
    protected userDataService: UserDataService,
    private fileUploadService: FileUploadService,
    private galleryService: GalleryService,
    private userService: UserService,
    private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  initForm() {
    this.dataForm = this.fb.group({
      images: [null],
    });
  }



  ngOnInit(): void {

    //Reload Data
     this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserData();
    })
    //Base Data
    this.getLoggedInUserData();


  }

  /**
   * IMAGE DRUG & DROP
   */
  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private updateProductWithImage() {
    this.subDataSix = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        const mData = {
          ...{ images: [...this.oldImages, ...images] },
        };
        this.onVerified(mData);
      });
  }

  removeOldImage(index: number) {
    this.removeImages.push(this.oldImages[index]);
    console.log("this.removeImages.push(this.oldImages[index]);",this.removeImages.push(this.oldImages[index]));

    this.oldImages.splice(index, 1);
    console.log("this.oldImages.splice(index, 1);",this.oldImages.splice(index, 1));
    this.dataForm.patchValue({ images: this.oldImages });
    console.log("this.dataForm.patchValue({ images: this.oldImages });",this.dataForm.patchValue({ images: this.oldImages }));
    this.updateProductWithImage();
  }

  getLoggedInUserData() {
    this.userDataService.getLoggedInUserData().subscribe(
        (res) => {
          if (res) {
            this.user = res.data;
            this.oldImages = this.user.images;
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      )
    }


  private addProductWithImage() {
    this.subDataFive = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        const mData = { ...{ images: images } };
        // this.addProductByUser(mData);
        this.onVerified(mData)
      });
  }



  onVerified(mData) {
    // console.log("thiiii",this.user)
     this.userService
      .updateUsersById(this.user._id,mData )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.success(res.message);
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {

          console.log(error);
        },
      });
  }

  public submit(){
    this.addProductWithImage();
  }

}
