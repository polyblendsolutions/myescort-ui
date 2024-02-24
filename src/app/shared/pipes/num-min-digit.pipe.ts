import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numMinDigit'
})
export class NumMinDigitPipe implements PipeTransform {

  transform(n: number, ...args: unknown[]): unknown {
    if (n < 10) {
      return '0' + n;
    }
    else if (n < 100) {
      return '' + n;
    }
    else {
      return '99+';
    }
  }

}
