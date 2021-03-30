import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logOut: any;

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  //Verify Login 
  public loginVerify(user: Login) {

    //Calling webservice and passing username aand password
    return this.httpClient.get<Login>(environment.apiUrl + "/api/user-login/" + user.username + "&" + user.password)
  }

  //Logout Method
  public logout() {
    sessionStorage.removeItem('fullName');
    sessionStorage.removeItem('USER_TYPE');

  }

}
