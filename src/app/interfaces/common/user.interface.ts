export interface User {
  _id?: string;
  // name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  username?: string;
  images?: string[];
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  region?:string;
  area?:string;
  zone?:string;
  profileImg?: string;
  registrationType?: string;
  addresses?: string[];
  hasAccess?: boolean;
  isVerfied?: boolean;
  verifiedStatus?: number;
  verify?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  success?: boolean;
}

export interface UserAuthResponse {
  success: boolean;
  token?: string;
  tokenExpiredIn?: number;
  data?: any;
  message?: string;
}

export interface UserJwtPayload {
  _id?: string;
  username: string;
}
