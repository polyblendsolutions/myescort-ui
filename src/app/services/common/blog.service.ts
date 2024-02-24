import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterData } from '../../interfaces/core/filter-data';
import { Blog } from 'src/app/interfaces/common/blog';
const baseUrl = `${environment.apiBaseLink}/api/blog`
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * BLOG HTTP REQUEST
   * getAllBlog()
   * getBlogById()
   */
  getAllBlog(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Blog[], count: number, success: boolean }>(`${baseUrl}/get-all`, filterData, { params });
  }

  getBlogById(_id?: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Blog, message: string, success: boolean }>(`${baseUrl}/${_id}`, { params })

  }


}
