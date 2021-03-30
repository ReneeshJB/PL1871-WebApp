import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,public router:Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot):boolean{
      const expectedRole= route.data.role;
      // console.log(route.data.role);
      const currentRole= sessionStorage.getItem("USER_TYPE");

      if(currentRole !== expectedRole){
        this.router.navigateByUrl('/login');
        return false;
      }

      return true;

    }

   
}
  

