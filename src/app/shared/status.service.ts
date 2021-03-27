import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpclient: HttpClient) { }

  getAllStatuses(): Observable<any> {
    return this.httpclient.get(environment.apiUrl + "/api/status");
  }
}
