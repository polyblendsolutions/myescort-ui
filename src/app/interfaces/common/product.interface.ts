import {Category} from './category.interface';
import {Type} from "./type.interface";
import {IntimateHair} from "./intimateHair.interface";
import {HairColor} from "./hairColor.interface";
import {Orientation} from "./orientation.interface";
import {Region} from "./region.interface";
import { Division } from './division.interface';
import { Area } from './area.interface';
import { Zone } from './zone.interface';
import { BodyType } from './bodyType.interface';
import { User } from './user.interface';

export interface Product {
  // publisher: any;
  _id?: string;
  name: string;
  slug?: string;
  verified?: boolean;
  description?: string;
  // pricing?: string;
  shortDescription?: string;
  title?: string;
  age?: string;
  height?: string;
  isVerfied?: boolean;
  verifiedStatus?: number;
  monday?:boolean;
  saturday?:boolean;
  friday?:boolean;
  thursday?:boolean;
  wednesday?:boolean;
  tuesday?:boolean;
  weight?: string;
  acceptsPeople?: string;
  runningOut?: string;
  size?: string;
  openingHours?: string[];
  zipCode?: string;
  address?: string;
  phone?: string;
  specialHours?: string;
  whatsApp?: string;
  email?: string;
  homePage?: string;
  featureTitle?: string;
  costPrice?: number;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  sku: string;
  emiMonth?: number[];
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  category?: Category;
  tags?: any;
  type?: Type;
  intimateHair?: IntimateHair;
  hairColor?: HairColor;
  orientation: Orientation;
  region?: Region;
  division?: Division;
  area?: Area;
  zone?: Zone;
  bodyType?:BodyType;
  specifications?: ProductSpecification[];
  features?: ProductFeature[];
  hasVariations?: boolean;
  status?: string;
  videoUrl?: string;
  threeMonth?: number;
  sixMonth?: number;
  twelveMonth?: number;
  unit?: string;
  user?: User;
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  addContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  activeUntill?: Date;
  select?: boolean;
  selectedQty?: number;
  orderVariation?: string;
  priceValue?: string;
  timing?: string;
  serviceDescription?: string;
  pricing?: pricingData[];
  // For Offer
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;
  dayHours?: {day?: string, startHour?: string, endHour?: string}[];
  mondayHours?: {startHour?: string, endHour?: string}[];
  tuesdayHours?: {startHour?: string, endHour?: string}[];
  wednesdayHours?: {startHour?: string, endHour?: string}[];
  thursdayHours?: {startHour?: string, endHour?: string}[];
  fridayHours?: {startHour?: string, endHour?: string}[];
  saturdayHours?: {startHour?: string, endHour?: string}[];
  publishDate?: Date;
}

export interface pricingData {
  _id?: string;
  serviceDescription?: string;
  timing?: string;
  priceValue?: string;
}

interface GroupCategory {
  _id: {
    category: string
  },
  name: string;
  slug: string;
  total: number;
  select?: boolean;
}

interface GroupSubCategory {
  _id: {
    subCategory: string
  },
  name: string;
  slug: string;
  total: number;
  select?: boolean;
}

interface BrandSubCategory {
  _id: {
    brand: string
  },
  name: string;
  slug: string;
  total: number;
  select?: boolean;
}

interface Types {
  _id: {
    Type: string
  },
  name: string;
  slug: string;
  total: number;
  select?: boolean;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
  type?: string;
}

export interface ProductFilterGroup {
  categories: GroupCategory[];
  subCategories: GroupSubCategory[];
  brands: BrandSubCategory[];
  types: Types[];
}


export interface ProductFeature {
  name?: string;
  value?: string;
}
