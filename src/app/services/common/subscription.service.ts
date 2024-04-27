import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { subscriptionDetail } from 'src/app/interfaces/common/subscription.interface';
import { ResponsePayload } from 'src/app/interfaces/core/response-payload.interface';
import { environment } from 'src/environments/environment';
const API_SUBSCRIPTION = `${environment.apiBaseLink}/api`;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor( private httpClient: HttpClient) { 
  }

  getAllSubscription() {
    return this.httpClient.get<{ data: subscriptionDetail[] }>(`${API_SUBSCRIPTION}/subscription`, {});
  }

  buyVipSubscription(userId:string, subscriptionId:string) {
    return this.httpClient.post<ResponsePayload>(`${API_SUBSCRIPTION}/user/activate-vip/${userId}`, {subscriptionId: subscriptionId});
  }
}
