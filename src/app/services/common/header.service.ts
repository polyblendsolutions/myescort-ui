import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  headerColorChange = new BehaviorSubject<boolean>(true);

  constructor() { }


}
