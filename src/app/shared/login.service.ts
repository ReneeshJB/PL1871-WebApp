import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  //get all list
  getAllUsers(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/users");
  }

  //Insert
  insertUser(user: Login): Observable<Login> {
    return this.httpClient.post<Login>(environment.apiUrl + "/api/users", user);
  }

  //Update
  updateUser(user: Login): Observable<Login> {
    return this.httpClient.put<Login>(environment.apiUrl + "/api/users", user);
  }
}
