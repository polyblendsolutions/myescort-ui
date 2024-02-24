import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private refreshData = new Subject<void>();
  private refreshWishList = new Subject<void>();
  private refreshCart = new BehaviorSubject<boolean>(false);
  private refreshSearch = new BehaviorSubject<boolean>(false);
  /**
   * REFRESH GLOBAL DATA
   */
  get refreshData$() {
    return this.refreshData;
  }
  needRefreshData$() {
    this.refreshData.next();
  }

  /**
   * REFRESH GLOBAL DATA
   */
  get refreshWishList$() {
    return this.refreshWishList;
  }
  needRefreshWishList$() {
    this.refreshWishList$.next();
  }

  needRefreshSearch$(data?: boolean) {
    if (data && data === true) {
      this.refreshSearch.next(data);
    } else {
      this.refreshSearch.next(false);
    }
  }
  /**
   * CART
   */
  get refreshCart$() {
    return this.refreshCart;
  }

  needRefreshCart$(data?: boolean) {
    if (data && data === true) {
      this.refreshCart.next(data);
    } else {
      this.refreshCart.next(false);
    }
  }

}
