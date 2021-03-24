import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserByUserName: any;

  //dependency injection
  constructor(private httpClient: HttpClient) { }


  //get all list
  getAllUsers(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/users");
  }

  //Insert
  insertUser(u: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + "/api/users", u);
  }

  //Update
  updateUser(u: User): Observable<User> {
    return this.httpClient.put<User>(environment.apiUrl + "/api/users", u);
  }

}
