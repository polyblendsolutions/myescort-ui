
import { Product } from './product.interface';
import {User} from './user.interface';


export interface Review {
  _id?: string;
  user?: string | User;
  product?: Product;
  name?: string;
  userName?: string;
  reviewDate: string;
  review: string;
  rating: number;
  ratingDue: any[];
  ratingDone: any[];
  status: boolean;
  reply: string;
  replyDate: string;
  like: number;
  dislike: number;
  images: string[];
}
