import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UiService} from "../../services/core/ui.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDataService} from '../../services/common/user-data.service';
import {StorageService} from '../../services/core/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  navigateFrom: string = null;
  public hidePassword = true;
  public hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private userDataService: UserDataService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    this.activatedRoute.queryParamMap.subscribe(param => {
      if (param.get('navigateFrom')) {
        this.navigateFrom = param.get('navigateFrom');
      }
    });
  }

  /**
   * FORM FUNCTIONS
   * initDataForm()
   * onSubmit()
   * togglePasswordVisibility()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      firstName: [null],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      isAccept: [null, Validators.required],
      hasAccess: [true]
    });
  }

  onSubmit() {

    if (this.dataForm.invalid) {
      // this.name?.markAsTouched({onlySelf: true});
      this.phone?.markAsTouched({onlySelf: true});
      this.password?.markAsTouched({onlySelf: true});
      this.username?.markAsTouched({onlySelf: true});
      this.firstName?.markAsTouched({onlySelf: true});
      this.lastName?.markAsTouched({onlySelf: true});
      this.email?.markAsTouched({onlySelf: true});
      this.confirmPassword?.markAsTouched({onlySelf: true});
      this.isAccept?.markAsTouched({onlySelf: true});

      if (this.dataForm.value.phoneNo && this.dataForm.value.phoneNo.length !== 11) {
        this.phone?.markAsTouched({onlySelf: true});
      }
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.dataForm.value.password !== this.dataForm.value.confirmPassword) {
      this.uiService.warn('Password and confirm password is not matched');
      this.password.markAsTouched({onlySelf: true});
      this.confirmPassword.markAsTouched({onlySelf: true});
      return;
    }

    const finalData = {
      ...this.dataForm.value,
      ...{username: this.generateUsername}
    };

    // this.userService.userSignupAndLogin(finalData, this.navigateFrom);
    this.checkUserAndSentOtp(this.dataForm.value.email, finalData, this.navigateFrom)


  }


  checkUserAndSentOtp(email: string, data: any, navigateFrom?: string) {
    this.userDataService.checkUserAndSentOtp({email: email, username: data.username})
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.uiService.success(res.message);
            this.storageService.storeDataToSessionStorage('REG_DATA_DK', data);
            this.storageService.storeDataToSessionStorage('navigateFrom', navigateFrom);
            this.router.navigate(['/verified-otp']);
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          console.log(error);
        })
      });
  }

  togglePasswordVisibility(inputType: string): void {
    if (inputType === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (inputType === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
  /**
   * Form Validations
   */
  get username() {
    return this.dataForm.get('username');
  }

  get firstName() {
    return this.dataForm.get('firstName');
  }

  get lastName() {
    return this.dataForm.get('lastName');
  }

  get email() {
    return this.dataForm.get('email');
  }


  get phone() {
    return this.dataForm.get('phone');
  }

  get password() {
    return this.dataForm.get('password');
  }

  get confirmPassword() {
    return this.dataForm.get('confirmPassword');
  }

  get isAccept() {
    return this.dataForm.get('isAccept');
  }

  /**
   * GENERATE USER NAME
   */
  public get generateUsername(): string {
    if (this.dataForm && this.dataForm.value.username) {
      const rs = this.dataForm.value.username.replace(/[^A-Za-z0-9]/g, '');
      return rs.trim().toLowerCase();
    } else {
      return '';
    }
  }


}
