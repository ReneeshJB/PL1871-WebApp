import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  fullName:any;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.fullName=sessionStorage.getItem("fullName");
  
  }

  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
