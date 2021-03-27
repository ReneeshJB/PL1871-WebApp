import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusCount } from './status-count';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  getStatusCount():Observable<StatusCount[]>{
    return this.httpClient.get<StatusCount[]>(environment.apiUrl + "/api/status/count");
  }

  getStatusCountBetweenDates(startDate:Date,endDate:Date):Observable<StatusCount[]>{
    return this.httpClient.get<StatusCount[]>(environment.apiUrl + "/api/status/count/date/"+startDate+"&"+endDate);

  }
}
