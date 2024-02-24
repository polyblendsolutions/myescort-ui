import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }


  /**
   * UTILS
   */

  getDateWithCurrentTime(date: Date): Date {
    const _ = moment();
    const newDate = moment(date).add({ hours: _.hour(), minutes: _.minute() });
    return newDate.toDate();
  }

  getDateString(date: Date, format?: string): string {
    const fm = format ? format : 'YYYY-MM-DD';
    return moment(date).format(fm);
  }



  /**
 * GET RANDOM NUMBER
 */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  // REGEX SEARCH VARIABLE
  searchWithRegex = (collection: any[], term: string, opts: { caseSensitive: boolean, includedKeys: string[] }) => {
    const filterBy = () => {
      const searchTerms = (!opts.caseSensitive) ? new RegExp(term, 'i') : new RegExp(term)
      return (obj) => {
        for (const key of Object.keys(obj)) {
          if (searchTerms.test(obj[key]) &&
            opts.includedKeys.includes(key)) return true
        }
        return false
      }
    }
    return collection.filter(filterBy())
  }

  getImageName(originalName: string): string {
    const array = originalName.split('.');
    array.pop();
    return array.join('');
  }


  mergeArrayString(array1: string[], array2: string[]): string[] {
    const c = array1.concat(array2);
    return c.filter((item, pos) => c.indexOf(item) === pos);
  }


}
