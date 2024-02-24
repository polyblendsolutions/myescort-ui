import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UiService} from "../../../services/core/ui.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/common/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;
  navigateFrom: string = null;
  showCategorySelect: boolean = false;
  showCreate: boolean = true;

  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) {

  }

  ngOnInit(): void {

    /* Form Initialize */
    this.initForm();

    this.activatedRoute.queryParamMap.subscribe(param => {
      if (param.get('navigateFrom')) {
        this.navigateFrom = param.get('navigateFrom');
      }
    });
  }

  /**
   * INITIALIZE FORM & SUBMIT
   * initForm();
   * onSubmit();
   */
  initForm() {
    this.dataForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit() {
    if (this.dataForm.valid) {
    } else {
      this.dataForm.markAllAsTouched();
    }

    if (this.dataForm.invalid) {
      this.username?.markAsTouched({onlySelf: true});
      this.password?.markAsTouched({onlySelf: true});
      if (this.dataForm.value.username && this.dataForm.value.username.length) {
        this.username?.markAsTouched({onlySelf: true});
      }
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.dataForm.value.password && this.dataForm.value.password.length < 6) {
      this.dataForm.controls['password'].setErrors({'incorrect': true});
      this.uiService.warn('Password must be at least 6 characters');
      return;
    }
    this.isLoading = true;
    this.userService.userLogin(this.dataForm.value, this.navigateFrom);

  }

  onShowCreate() {
    this.showCreate = false;
  }

  onAdTypeChange(adType: string) {
    if (adType) {
      this.showCategorySelect = true;
    }
  }

  /**
   * Form Validations
   */
  get username() {
    return this.dataForm.get('username');
  }

  get password() {
    return this.dataForm.get('password');
  }


}
