import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Report} from '../../interfaces/common/report.interface';
import {FilterData} from '../../interfaces/core/filter-data';
const API_REVIEW_CONTROL = environment.apiBaseLink + '/api/report/';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addReport
   * deleteReportByReportId
   * getAllReportsByQuery
   */

  addReport(data: Report) {
    return this.httpClient.post<{ message: string }>(API_REVIEW_CONTROL + 'add', data);
  }
  getReportByUserId() {
    return this.httpClient.get<{ data: Report[], success: boolean }>(API_REVIEW_CONTROL+ 'get-Report-by-user');
  }

  deleteReportByReportId(id: string) {
    return this.httpClient.delete<{message?: string}>(API_REVIEW_CONTROL + 'delete-loggedin-user-report/' + id);
  }

  getAllReportsByQuery(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Report[], count: number, success: boolean }>(API_REVIEW_CONTROL + 'get-all-report-by-query', filterData, {params});
  }


}
