import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { Subscription } from 'rxjs';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Division } from 'src/app/interfaces/common/division.interface';
import { DivisionService } from 'src/app/services/common/division.service';
import { Area } from 'src/app/interfaces/common/area.interface';
import { AreaService } from 'src/app/services/common/area.service';
import { Zone } from 'src/app/interfaces/common/zone.interface';
import { ZoneService } from 'src/app/services/common/zone.service';
import { UiService } from 'src/app/services/core/ui.service';
import { User } from 'src/app/interfaces/common/user.interface';
import { ReloadService } from 'src/app/services/core/reload.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { FileData } from 'src/app/interfaces/gallery/file-data';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  //Store data
  dataForm!: FormGroup;
  divisions: Division[];
  area: Area[];
  zone: Zone[];
  user: User;

  imageChangedEvent: any = null;
  imgPlaceHolder = "/assets/images/png/profile.jpg";

  pickedImage?: any;
  file: any = null;
  newFileName: string;

  imgBlob: any = null;

  selectedDivision: string;
  selectedArea: string;
  selectedZone: string;

  //Subscription
  private subUserData: Subscription;
  private subForm: Subscription;
  private subDivisionData: Subscription;
  private subRealod: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;


  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private dialog: MatDialog,
    private fileUploadService: FileUploadService,
  ) {

  }
  ngOnInit(): void {

    //Reload Data
    this.subRealod = this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserData();
    })

    //Base Data
    this.getLoggedInUserData();
    this.getAllDivision();
    this.initForm();

  }



  /**
   * FORM HANDLE FUNCTIONALITY
   * initForm()
   * onSubmit()
   */
  initForm() {
    this.dataForm = this.fb.group({
      firstname: [null],
      lastname: [null],
      email: [null, [Validators.required, Validators.email]],
      profileImage: [null],
      telephone: [null],
      whatsappNo: [null],
      homePageUrl: [null],
      region: ['--selected--'],
      area: ['--selected--'],
      zone: ['--selected--'],
      zipCode: [null],
      facebook: [null],
      twiter: [null],
      youtube: [null],
      instagram: [null],
      linkedin: [null],
      pinterest: [null],
      reddit: [null],
      addresses: [null]
    })
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Invalid Forms');
      this.dataForm.markAllAsTouched();
    } else {
      this.updateAccountDetails(this.dataForm.value);
    }
  }


  /***
   * ON SELECT CHANGE 
   * onChangeRegion()
   * onChangeArea()
   */
  onChangeRegion(event: any) {
    if (event.target.value) {
      this.selectedDivision = (this.divisions.find(f => f._id === event.target.value))?.name;
      this.dataForm.patchValue({ region: this.selectedDivision });
      this.getAllArea(event.target.value);
    }
  }

  onChangeArea(event: any) {
    if (event.target.value) {
      this.selectedArea = (this.area.find(f => f._id === event.target.value))?.name;
      this.dataForm.patchValue({ area: this.selectedArea });
      this.getAllZone(event.target.value);
    }
  }



  /***
   * HTTP REQUEST HANDLE
   * getLoggedInUserData()
   * getAllDivision()
   * getAllArea()
   * getAllZone()
   * updateAccountDetails()
   * imageUploadOnServer()
   */
  getLoggedInUserData() {
    this.subUserData = this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
          this.imgPlaceHolder = this.user.profileImg
          this.dataForm.patchValue(res.data);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getAllDivision() {
    let mSelect = {
      name: 1,
      status: 1,
      priority: 1,
      createdAt: 1
    }
    const filter: FilterData = {
      filter: { status: 'publish' },
      select: mSelect,
      pagination: null,
      sort: { createdAt: -1 }
    }

    this.subDivisionData = this.divisionService.getAllDivisions(filter).subscribe(
      (res) => {
        if (res.success) {
          this.divisions = res.data;
          console.log('This Division', this.divisions);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getAllArea(id: string) {

    this.subAreaData = this.areaService.getAreaByParentId(id).subscribe(
      (res) => {
        if (res.success) {
          this.area = res.data;
          console.log('This area', this.area);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private getAllZone(id: string) {

    this.subZoneData = this.zoneService.getZoneByParentId(id).subscribe(
      (res) => {
        if (res.success) {
          this.zone = res.data;
          console.log('This zoe', this.zone);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  updateAccountDetails(data: any) {
    this.subForm = this.userDataService.updateLoggedInUserInfo(data).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          console.log(res.data);
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private imageUploadOnServer() {
    const data: FileData = {
      fileName: this.newFileName,
      file: this.imgBlob,
      folderPath: 'admins'
    };
    this.subUserData = this.fileUploadService.uploadSingleImage(data)
      .subscribe(res => {
        this.removeImageFiles();
        if (this.user?.profileImg) {
          this.removeOldImageFromServer(this.user?.profileImg);
        }
        this.updateAccountDetails({ profileImg: res?.url });
      }, error => {
        console.log(error);
      });
  }

  private removeOldImageFromServer(imgUrl: string) {
    this.subUserData = this.fileUploadService.removeSingleFile(imgUrl)
      .subscribe(res => {
        console.log(res.message);
      }, error => {
        console.log(error);
      });
  }


  /**
   * ON IMAGE PICK
   * fileChangeEvent()
   * removeImageFiles()
   */

  fileChangeEvent(event: any) {
    this.file = (event.target as HTMLInputElement).files[0];
    // File Name Modify...
    const originalNameWithoutExt = this.file.name.toLowerCase().split(' ').join('-').split('.').shift();
    const fileExtension = this.file.name.split('.').pop();
    // Generate new File Name..
    this.newFileName = `${Date.now().toString()}_${originalNameWithoutExt}.${fileExtension}`;

    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.imgPlaceHolder = reader.result as string;
    };

    // Open Upload Dialog
    if (event.target.files[0]) {
      this.openComponentDialog(event);
    }

    // NGX Image Cropper Event..
    this.imageChangedEvent = event;
  }

  private removeImageFiles() {
    this.file = null;
    this.newFileName = null;
    this.pickedImage = null;
    this.imgBlob = null;
  }


  /**
   * OPEN COMPONENT DIALOG
   * openComponentDialog()
   */
  public openComponentDialog(data?: any) {
    const dialogRef = this.dialog.open(ImageCropComponent, {
      data,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      width: '680px',
      minHeight: '400px',
      maxHeight: '600px'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.imgBlob) {
          this.imgBlob = dialogResult.imgBlob;
        }
        if (dialogResult.croppedImage) {
          this.pickedImage = dialogResult.croppedImage;
          this.imgPlaceHolder = this.pickedImage;

          if (this.pickedImage) {
            console.log(this.pickedImage)
            this.imageUploadOnServer();
          }
        }
      }
    });
  }



  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  ngOnDestroy(): void {
    if (this.subAreaData) {
      this.subAreaData.unsubscribe();
    }
    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subRealod) {
      this.subRealod.unsubscribe();
    }
    if (this.subUserData) {
      this.subUserData.unsubscribe();
    }
    if (this.subZoneData) {
      this.subZoneData.unsubscribe();
    }
  }

}
