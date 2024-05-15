import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  encryptUserLogin: 'LAUNDRY_MARKET_USER_1_' + environment.VERSION,
  productFormData: 'LAUNDRY_MARKET_PRODUCT_FORM_' + environment.VERSION,
  userCoupon: 'LAUNDRY_MARKET_USER_COUPON_' + environment.VERSION,
  userWishList: 'LAUNDRY_MARKET_USER_CART_' + environment.VERSION,
});
