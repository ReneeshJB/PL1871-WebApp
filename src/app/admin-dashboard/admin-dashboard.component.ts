import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  fullname: any;
  constructor(private authService:AuthService,private router:Router){ } 

  ngOnInit(): void {
    this.fullname=localStorage.getItem("fname");
  }

  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
