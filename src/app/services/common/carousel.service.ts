import { Injectable } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { EffectCoverflow,EffectFade,Pagination, Navigation, Autoplay} from "swiper";
// install Swiper modules
SwiperCore.use([EffectCoverflow,EffectFade,Pagination, Navigation, Autoplay]);
@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor() { }
}
