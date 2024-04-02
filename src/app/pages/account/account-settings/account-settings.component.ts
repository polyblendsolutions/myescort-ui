import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
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
  passwordChanged: boolean = false;
  public hideConfirmPassword = true;
  public hideNewPassword = true;
  public hideOldpassword = true;
  isVerify: boolean = false;
  subUserInfo: Subscription

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private userDataService: UserDataService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public storageService: StorageService,
  ) { }
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
        this.dataForm.get('oldPassword').setValidators([Validators.required, Validators.minLength(6)]);
        this.dataForm.get('confirmPassword').setValidators([Validators.required, Validators.minLength(6)]);
      } else {
        this.dataForm.get('oldPassword').clearValidators();
        this.dataForm.get('confirmPassword').clearValidators();
      }
      this.dataForm.get('oldPassword').updateValueAndValidity();
      this.dataForm.get('confirmPassword').updateValueAndValidity();
    });
  }

  getLoggedInUserData() {
    this.subUserInfo=this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
          if (this.user.isVerfied === true) {
            this.isVerify = true
          }
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
    const { email, password, oldPassword, confirmPassword } = this.dataForm.value;
    if (this.user.email !== email) {
      this.updateEmail(email);
    }
    if (this.passwordChanged) {
      if (password !== confirmPassword) {
        this.uiService.warn('Password and confirm password is not matched');
        return;
      }
      if (password === oldPassword) {
        this.uiService.warn('Old Password and new password should be different');
        return;
      }
      this.updatePassword(password, oldPassword)
    }
  }

  updateEmail(email: string) {
    return this.userDataService.updateLoggedInUserInfo({ email }).pipe(
      take(1)
    ).subscribe(
      (res) => {
        if (res?.success) {
          this.uiService.success('Email is successfully changed');
          this.getLoggedInUserData();
        }
        else if (!res?.success) {
          this.uiService.wrong(res.message);
        }
      },
      (error) => {
        // Handle error
        this.uiService.wrong(error?.error?.message);
      }
    );
    
  }
  updatePassword(password: string, oldPassword: string) {
    return this.userDataService.changeLoggedInUserPassword({ password, oldPassword }).pipe(
      take(1)
    ).subscribe(
      (res) => {
        // Handle success
        if (res?.success) {
          this.uiService.success(res.message);
          this.dataForm.reset(); // Reset the form
        }
        else if (!res?.success) {
          this.uiService.wrong(res.message);
        }
      },
      (error) => {
        // Handle error
        this.uiService.wrong(error?.error?.message);
      }
    );
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
      this.passwordChanged = this.dataForm.get('password').dirty;
      this.isFormChanged = this.dataForm.dirty;
    });
  }


  togglePasswordVisibility(): void {
    this.hideOldpassword = !this.hideOldpassword;
  }
  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;

  }
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  
  ngOnDestroy(): void {
    if(this.subUserInfo){
      this.subUserInfo.unsubscribe();
    }
 }
}
