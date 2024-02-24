import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import {UiService} from '../core/ui.service';
import {StorageService} from '../core/storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReloadService} from '../core/reload.service';
import {User, UserAuthResponse} from '../../interfaces/common/user.interface';
import {DATABASE_KEY} from '../../core/utils/global-variable';

const API_URL_USER = environment.apiBaseLink + '/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string;
  private isUser = false;
  private userId: string = null;
  private userStatusListener = new Subject<boolean>();
  // Hold The Count Time..
  private tokenTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private uiService: UiService,
    private storageService: StorageService,
    private spinner: NgxSpinnerService,
    private reloadService: ReloadService,
  ) {
  }


  /**
   * MAIN METHODS
   * checkUserForRegistration()
   * userSignupAndLogin()
   * userLogin()
   */

  checkUserForRegistration(phoneNo: string) {
    return this.httpClient.post<{ data: { otp: boolean }, message: string, success: boolean }>(API_URL_USER + 'check-user-for-registration', {phoneNo});
  }

  resetUserPassword(data: string) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL_USER + 'reset-user-password', data);
  }

  // userSignupAndLogin(data: User, navigateFrom?: string) {
  //   this.httpClient.post<UserAuthResponse>
  //   (API_URL_USER + 'signup-and-login', data).subscribe(async res => {
  //     if (res.success) {
  //       this.token = res.token;
  //       // When Role & Permissions
  //       if (res.data) {
  //         this.userId = res.data._id;
  //       }
  //       // When Token
  //       if (res.token) {
  //         this.isUser = true;
  //         this.userStatusListener.next(true);
  //         // For Token Expired Time..
  //         const expiredInDuration = res.tokenExpiredIn;
  //         this.setSessionTimer(expiredInDuration);
  //         // Save Login Time & Expiration Time & Token to Local Storage..
  //         const now = new Date();
  //         const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
  //         // Store to Local
  //         this.saveUserData(res.token, expirationDate, this.userId);
  //
  //         this.spinner.hide();
  //         // Snack bar..
  //         this.uiService.success(res.message);
  //         // Navigate..
  //         if (navigateFrom) {
  //           this.router.navigate([navigateFrom]);
  //         } else {
  //           this.router.navigate([environment.userBaseUrl]);
  //         }
  //       }
  //     } else {
  //       this.uiService.wrong(res.message);
  //       this.spinner.hide();
  //       this.userStatusListener.next(false);
  //     }
  //
  //   }, error => {
  //     console.log(error)
  //     this.spinner.hide();
  //     this.userStatusListener.next(false);
  //     // console.log(error);
  //   });
  // }
 userSignupAndLogin(data: User, navigateFrom?: string) {
    this.httpClient.post<UserAuthResponse>
    (API_URL_USER + 'signup-and-login', data).subscribe(async res => {
      if (res.success) {


        this.token = res.token;
        // When Role & Permissions
        if (res.data) {
          this.userId = res.data._id;
          this.uiService.success(res.message);
        }
        // When Token
        if (res.token) {
          this.isUser = true;
          this.userStatusListener.next(true);
          // For Token Expired Time..
          const expiredInDuration = res.tokenExpiredIn;
          this.setSessionTimer(expiredInDuration);
          // Save Login Time & Expiration Time & Token to Local Storage..
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
          // Store to Local
          this.saveUserData(res.token, expirationDate, this.userId);

          this.spinner.hide();
          // Snack bar..
          this.uiService.success(res.message);
          // Navigate..
          if (navigateFrom) {
            this.router.navigate([navigateFrom]);
          } else {
            this.router.navigate([environment.userBaseUrl]);
          }
        }
      } else {
        this.uiService.wrong(res.message);
        this.spinner.hide();
        this.userStatusListener.next(false);
      }

    }, error => {
      console.log(error)
      this.spinner.hide();
      this.userStatusListener.next(false);
      // console.log(error);
    });
  }

  userSignupAndLoginSocial(data: User, navigateFrom?: string) {
    console.log('service', data)
    this.httpClient.post<UserAuthResponse>
    (API_URL_USER + 'social-signup-and-login', data).subscribe(async res => {
      if (res.success) {
        this.token = res.token;
        // When Role & Permissions
        if (res.data) {
          this.userId = res.data._id;
        }
        // When Token
        if (res.token) {
          this.isUser = true;
          this.userStatusListener.next(true);
          // For Token Expired Time..
          const expiredInDuration = res.tokenExpiredIn;
          this.setSessionTimer(expiredInDuration);
          // Save Login Time & Expiration Time & Token to Local Storage..
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
          // Store to Local
          this.saveUserData(res.token, expirationDate, this.userId);

          this.spinner.hide();
          // Snack bar..
          this.uiService.success(res.message);
          // Navigate..
          if (navigateFrom) {
            this.router.navigate([navigateFrom]);
          } else {
            this.router.navigate([environment.userBaseUrl]);
          }
        }
      } else {
        this.uiService.wrong(res.message);
        this.spinner.hide();
        this.userStatusListener.next(false);
      }

    }, error => {
      console.log(error)
      this.spinner.hide();
      this.userStatusListener.next(false);
      // console.log(error);
    });
  }

  userLogin(data: { username: string, password: string }, navigateFrom?: string) {
    this.httpClient.post<UserAuthResponse>
    (API_URL_USER + 'login', data)
      .subscribe(async res => {
        if (res.success) {
          this.token = res.token;
          // When Role & Permissions
          if (res.data) {
            this.userId = res.data._id;
          }
          // When Token
          if (res.token) {
            this.isUser = true;
            this.userStatusListener.next(true);
            // For Token Expired Time..
            const expiredInDuration = res.tokenExpiredIn;
            this.setSessionTimer(expiredInDuration);
            // Save Login Time & Expiration Time & Token to Local Storage..
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
            // Store to Local
            this.saveUserData(res.token, expirationDate, this.userId);

            this.spinner.hide();
            // Snack bar..
            this.uiService.success(res.message);
            // Navigate..
            if (navigateFrom) {
              this.router.navigate([navigateFrom]);
            } else {
              this.router.navigate([environment.userBaseUrl]);
            }
          }
        } else {
          this.uiService.wrong(res.message);
          this.spinner.hide();
          this.userStatusListener.next(false);
        }

      }, error => {
        this.spinner.hide();
        this.userStatusListener.next(false);
        // console.log(error);
      });
  }


  /**
   * USER AFTER LOGGED IN METHODS
   * autoUserLoggedIn()
   * userLogOut()
   */
  autoUserLoggedIn() {
    const authInformation = this.getUserData();
    if (!authInformation) {
      this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);
      return;
    }
    const now = new Date();
    const expDate = new Date(authInformation.expiredDate);
    const expiresIn = expDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userStatusListener.next(true);
      this.isUser = true;
      this.userId = authInformation.userId;
      this.setSessionTimer(expiresIn / 1000);
    }
  }

  userLogOut() {
    this.token = null;
    this.isUser = false;

    this.userStatusListener.next(false);
    this.reloadService.needRefreshCart$(false);
    // Clear Token from Storage..
    this.clearUserData();
    // Clear The Token Time..
    clearTimeout(this.tokenTimer);
    // Navigate..
    this.router.navigate([environment.userLoginUrl]);
  }

  /**
   * GET LOGGED IN BASE DATA
   * getUserStatus()
   * getUserToken()
   * getUserId()
   * getUserStatusListener()
   */

  getUserStatus() {
    return this.isUser;
  }

  getUserToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserStatusListener() {
    return this.userStatusListener.asObservable();
  }


  /**
   * Save & GET User Info Encrypt to Local
   * saveUserData()
   * clearUserData()
   * getUserData()
   * setSessionTimer()
   */
  protected saveUserData(token: string, expiredDate: Date, userId: string) {
    const data = {
      token,
      expiredDate,
      userId,
    };
    this.storageService.addDataToEncryptLocal(data, DATABASE_KEY.encryptUserLogin);
  }

  protected clearUserData() {
    this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);
  }

  protected getUserData() {
    return this.storageService.getDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);
  }

  private setSessionTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.userLogOut();
    }, duration * 1000); // 1s = 1000ms
    // console.log('Setting Time: ' + duration);
  }

  /**
   * SOCIAL LOGIN
   * GoogleAuthWithSocialAuth()
   */
  // GoogleAuthWithSocialAuth(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(m => {
  //       console.log('user', m);
  //       // const user: User = {
  //       //   name: m.name,
  //       //   username: m.id,
  //       //   password: null,
  //       //   phoneNo: null,
  //       //   profileImg: m.photoUrl,
  //       //   email: m.email ? m.email : null,
  //       //   hasAccess: true,
  //       //   registrationType: 'google',
  //       // };
  //       // this.userSignupAndLoginSocial(user);
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // }
  //
  // FacebookAuthWithSocialAuth(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  //     .then(m => {
  //       const user: User = {
  //         name: m.name,
  //         username: m.id,
  //         password: null,
  //         phoneNo: null,
  //         profileImg: m.photoUrl,
  //         email: m.email ? m.email : null,
  //         hasAccess: true,
  //         registrationType: 'facebook',
  //       };
  //       console.log('user', user);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }


  /**
   * ON SUCCESS LOGIN
   */

  public onSuccessLogin(token: string, expiredIn: number,id: string, redirectFrom?: string, fromRegistration?: boolean) {
    console.log('token,expiredIn,id',token,expiredIn,id)
    this.isUser = true;
    this.userStatusListener.next(true);

    // For Token Expired Time..
    const expiredInDuration = expiredIn;
    ;
    this.setSessionTimer(expiredInDuration);

    // Save Login Time & Expiration Time & Token to Local Storage..
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);

    this.saveUserData(token, expirationDate,id);

    // Snack bar..

    this.uiService.success('Welcome! Login Success.');
    // Spinner
    this.spinner.hide();


    // Navigate with Auth..
    if (redirectFrom) {
      this.router.navigate(["/account/","basic-info"]);
    } else {
      this.router.navigate([environment.userBaseUrl]);
    }
  }

  updateUsersById(id: string, data: User) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_URL_USER + 'update-data-user/' + id, data);
  }



}
