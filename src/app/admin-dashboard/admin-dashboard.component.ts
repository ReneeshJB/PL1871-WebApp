import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  fullName: any;
  constructor(private authService:AuthService,private router:Router){ } 

  ngOnInit(): void {
    this.fullName=localStorage.getItem("fullName");
  }

  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
