import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfiguration } from 'src/app/shared/app-config/app-configuration';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ApproversService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfiguration,private http: HttpClient) { }
  getApprovers(sponsorId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/sponsor/${sponsorId}/approvers`);
  }
}
