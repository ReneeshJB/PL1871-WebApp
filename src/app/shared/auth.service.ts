import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logOut: any;

  constructor(private httpClient: HttpClient,
    private router: Router) { }

    //Verify Login 
    public loginVerify(user: User){
      
      //Calling webservice and passing username aand password
      return this.httpClient.get<User>(environment.apiUrl + "/api/user-login/" + user.fullname + "&" + user.password)
    }

    //Logout Method
    public logout(){
      sessionStorage.removeItem('fullname');
      localStorage.removeItem('fullname');
      localStorage.removeItem('ACESS_ROLE');
      
      //token based authentication - JWT

    }

}
