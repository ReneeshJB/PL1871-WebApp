import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //Createa constructor
  constructor(private authService:AuthService,public router:Router){

  }
  //admin /home /manager /resource
  //true -- will display ---
  //false -- will be blocked
  canActivate(
    route: ActivatedRouteSnapshot):boolean{
      const expectedRole= route.data.role;
      const currentRole= localStorage.getItem("ACESS_ROLE");

      if(currentRole !== expectedRole){
        this.router.navigateByUrl('/login');
        return false;
      }

      return true;

    }

   
}
  

