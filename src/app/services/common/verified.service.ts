import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Verified} from '../../interfaces/common/verified.interface';
import {Observable} from 'rxjs';
import {FilterData} from "../../interfaces/core/filter-data";

const API_NEW_EXPENSE = environment.apiBaseLink + '/api/verified/';

@Injectable({
  providedIn: 'root',
})
export class VerifiedService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * addVerified
   * insertManyVerified
   * getAllVerifieds
   * getVerifiedById
   * updateVerifiedById
   * updateMultipleVerifiedById
   * deleteVerifiedById
   * deleteMultipleVerifiedById
   */

  // addVerified(data: Verified): Observable<ResponsePayload> {
  //   return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add', data);
  // }
  addVerified(data: Verified): Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add-by-admin', data);
  }

  getAllVerified(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{
      data: Verified[];
      count: number;
      success: boolean;
      calculation: any;
    }>(API_NEW_EXPENSE + 'get-all-verified/', filterData, {params});
  }

  getVerifiedById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: Verified;
      message: string;
      success: boolean;
    }>(API_NEW_EXPENSE + id, {params});
  }

  updateVerifiedById(id: string, data: Verified) {
    return this.httpClient.put<{ message: string; success: boolean }>(
      API_NEW_EXPENSE + 'update/' + id,
      data
    );
  }

  // deleteVerifiedById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id);
  // }

  deleteVerifiedById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(
      API_NEW_EXPENSE + 'delete/' + id,
      {params}
    );
  }

  deleteMultipleVerifiedById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(
      API_NEW_EXPENSE + 'delete-multiple',
      {ids: ids},
      {params}
    );
  }

  //  verifiedGroupByField<T>(dataArray: T[], field: string): VerifiedGroup[] {
  //   const data = dataArray.reduce((group, product) => {
  //     const uniqueField = product[field]
  //     group[uniqueField] = group[uniqueField] ?? [];
  //     group[uniqueField].push(product);
  //     return group;
  //   }, {});
  //
  //   const final = [];
  //
  //   for (const key in data) {
  //     final.push({
  //       _id: key,
  //       data: data[key]
  //     })
  //   }
  //
  //   return final as VerifiedGroup[];

  // }
}
