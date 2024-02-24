import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';

const API_URL = environment.apiBaseLink + '/api/otp/';


@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * generateOtpWithEmail()
   * validateOtpWithEmail()
   */

  generateOtpWithEmail(email: string) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'generate-otp', {email});
  }

  validateOtpWithEmail(data: { email: string, code: string }) {
    return this.httpClient.post<ResponsePayload>
    (API_URL + 'validate-otp', data);
  }


}
