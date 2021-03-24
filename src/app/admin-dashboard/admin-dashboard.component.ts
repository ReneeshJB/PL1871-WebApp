import { Component, OnInit } from '@angular/core';

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
