import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  public hidePassword = true;
  public hideConfirmPassword = true;

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

  onSubmit(): void {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      this.uiService.warn('Please fill in all the required fields correctly.');
      return;
    }
    const payload = {};
    // Iterate over form controls
    for (const key of Object.keys(this.dataForm.controls)) {
      const control = this.dataForm.get(key);
      const value = control.value;

      // Check if value is not null and assign it to payload
      if (value !== null && value?.length) {
        payload[key] = value;
      }
    }

    // Use payload object for further processing
    console.log('Payload:', payload);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
