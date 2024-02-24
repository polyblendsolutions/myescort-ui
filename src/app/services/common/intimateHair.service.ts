import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponsePayload } from '../../interfaces/core/response-payload.interface';
import { IntimateHair } from '../../interfaces/common/intimateHair.interface';
import {FilterData} from "../../interfaces/core/filter-data";
import { Observable } from 'rxjs';

const API_NEW_EXPENSE = environment.apiBaseLink + '/api/intimateHair/';

@Injectable({
  providedIn: 'root',
})
export class IntimateHairService {
  constructor(private httpClient: HttpClient) {}

  /**
   * addIntimateHair
   * insertManyIntimateHair
   * getAllIntimateHairs
   * getIntimateHairById
   * updateIntimateHairById
   * updateMultipleIntimateHairById
   * deleteIntimateHairById
   * deleteMultipleIntimateHairById
   */

  addIntimateHair(data: IntimateHair): Observable<ResponsePayload> {
    return this.httpClient.post<ResponsePayload>(API_NEW_EXPENSE + 'add', data);
  }

  getAllIntimateHair(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{
      data: IntimateHair[];
      count: number;
      success: boolean;
      calculation: any;
    }>(API_NEW_EXPENSE + 'get-all/', filterData, { params });
  }

  getIntimateHairById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{
      data: IntimateHair;
      message: string;
      success: boolean;
    }>(API_NEW_EXPENSE + id, { params });
  }

  updateIntimateHairById(id: string, data: IntimateHair) {
    return this.httpClient.put<{ message: string; success: boolean }>(
      API_NEW_EXPENSE + 'update/' + id,
      data
    );
  }

  // deleteIntimateHairById(id: string) {
  //   return this.httpClient.delete<ResponsePayload>(API_NEW_EXPENSE + 'delete/' + id);
  // }

  deleteIntimateHairById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(
      API_NEW_EXPENSE + 'delete/' + id,
      { params }
    );
  }

  deleteMultipleIntimateHairById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(
      API_NEW_EXPENSE + 'delete-multiple',
      { ids: ids },
      { params }
    );
  }

  //  intimateHairGroupByField<T>(dataArray: T[], field: string): IntimateHairGroup[] {
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
  //   return final as IntimateHairGroup[];

  // }
}
