import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-coordinator-dashboard',
  templateUrl: './coordinator-dashboard.component.html',
  styleUrls: ['./coordinator-dashboard.component.scss']
})
export class CoordinatorDashboardComponent implements OnInit {

  fullName:any;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.fullName=localStorage.getItem("fullName");
  
  }

  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
