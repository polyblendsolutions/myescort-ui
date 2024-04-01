import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/common/user.interface';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { StorageService } from 'src/app/services/core/storage.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  dataForm: FormGroup;
  user: User = null;
  isFormChanged: boolean = false;

  public hidePassword = true;
  public hideConfirmPassword = true;
  public password = true;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private userDataService: UserDataService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public storageService: StorageService,
  ) {}
  ngOnInit(): void {
    // Initialize Data Form
    this.initDataForm();
    this.getLoggedInUserData();
    this.subscribeToFormChanges();
  
  }

  /**
   * FORM FUNCTIONS
   * initDataForm()
   * onSubmit()
   * togglePasswordVisibility()
   */
  private initDataForm(): void {
    this.dataForm = this.fb.group({
      email: [null, [Validators.email]],
      password: [null],
      confirmPassword: [null],
      oldPassword: [null]
    });

    // Add dynamic validation for confirm password field
    this.dataForm.get('password').valueChanges.subscribe(value => {
      if (value) {
        this.dataForm.get('confirmPassword').setValidators([Validators.required]);
      } else {
        this.dataForm.get('confirmPassword').clearValidators();
      }
      this.dataForm.get('confirmPassword').updateValueAndValidity();
    });
  }

  getLoggedInUserData() {
    this.userDataService.getLoggedInUserData().subscribe(
        (res) => {
          if (res) {
            this.user = res.data;
          //  if(this.user.isVerfied === true){
          //    this.isVerify = false
          //  }
          this.patchUserDataToForm();
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      )
    }
  
  onSubmit(): void {
    if (!this.isFormChanged) {
      this.uiService.warn('No changes detected. Please make changes before updating.');
      return;
    }
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      this.uiService.warn('Please fill in all the required fields correctly.');
      return;
    }
    const email = this.dataForm.get('email').value;
    const password = this.dataForm.get('password').value;
    const oldPassword = this.dataForm.get('oldPassword').value;

    // const payload = {};
    // // Iterate over form controls
    // for (const key of Object.keys(this.dataForm.controls)) {
    //   const control = this.dataForm.get(key);
    //   const value = control.value;

    //   // Check if value is not null and assign it to payload
    //   if (value !== null && value?.length) {
    //     payload[key] = value;
    //   }
    // }

    // // Use payload object for further processing
    // console.log('Payload:', payload);
    if (password) {
      // Only password changed
      if (this.dataForm.value.password !== this.dataForm.value.confirmPassword) {
        this.uiService.warn('Password and confirm password is not matched');
        this.dataForm.value.password.markAsTouched({onlySelf: true});
        this.dataForm.value.confirmPassword.markAsTouched({onlySelf: true});
        return;
      }
      this.userDataService.changeLoggedInUserPassword({ password, oldPassword }).subscribe(
        (res) => {
          // Handle success
          if(res?.success){
            this.uiService.success(res.message);
          }
          else if(!res?.success){
            this.uiService.wrong(res.message);
          }
        },
        (error) => {
          // Handle error
        }
      );
    }
    else if (email) {
      // Only email changed
      if (this.user.email===email)
      {
        this.uiService.warn('Please make changes before updating.');
        return
      }
      this.userDataService.updateLoggedInUserInfo({ email }).subscribe(
        (res) => {
          this.uiService.success(res.message);
        },
        (error) => {
          // Handle error
        }
      );
    } 
  }

  patchUserDataToForm() {
    if (this.user) {
      this.dataForm.patchValue({
        email: this.user?.email,
        // Password should not be patched for security reasons
      });
    }
  }

  subscribeToFormChanges(): void {
    this.dataForm.valueChanges.subscribe(() => {
      this.isFormChanged = this.dataForm.dirty;
    });
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.hideConfirmPassword = !this.hideConfirmPassword;
    this.password = !this.password;
  }
}
