import {Component, OnInit} from '@angular/core';
import {OtpService} from '../../services/common/otp.service';
import {UiService} from '../../services/core/ui.service';
import {StorageService} from '../../services/core/storage.service';
import {UserService} from '../../services/common/user.service';

@Component({
  selector: 'app-verified-otp',
  templateUrl: './verified-otp.component.html',
  styleUrls: ['./verified-otp.component.scss']
})
export class VerifiedOtpComponent implements OnInit{

  isLoading: boolean = false;
  private isOtpValid: boolean = false;
  isResentOtp: boolean = false;

  private regData: any;
  private navigateFrom: any;

  constructor(
    private otpService: OtpService,
    private uiService: UiService,
    private storageService: StorageService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.regData = this.storageService.getDataFromSessionStorage('REG_DATA_DK');
    // this.navigateFrom = this.storageService.getDataFromSessionStorage('navigateFrom');
  }

  onEnterOtp(event: string) {
    this.validateOtpWithEmail({email: this.regData.email, code: event})
  }

  /**
   * HTTP REQ HANDLE
   * generateOtpWithEmail()
   * validateOtpWithPhoneNo()
   */

  generateOtpWithEmail(email: string) {
    this.otpService.generateOtpWithEmail(email)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isResentOtp =true;
            this.uiService.success(res.message);
          } else {
            this.isResentOtp =false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isResentOtp =false;
          console.log(error);
        })
      });
  }

  validateOtpWithEmail(data: { email: string, code: string }) {
    this.isLoading = true;
    this.otpService.validateOtpWithEmail(data)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.isLoading = true;
            this.userService.userSignupAndLogin(this.regData, this.navigateFrom);
          } else {
            this.isOtpValid = false;
            this.isLoading = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpValid = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }


  onResentOtp(event: boolean) {
    this.generateOtpWithEmail(this.regData.email);
  }
}
