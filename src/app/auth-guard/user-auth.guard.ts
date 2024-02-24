import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserService} from '../services/common/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isUser = this.userService.getUserStatus();
    if (!isUser) {
      this.router.navigate([environment.userLoginUrl], {queryParams: {navigateFrom: state.url}, queryParamsHandling: 'merge'});
    }
    return isUser;
  }
}
