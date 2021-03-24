import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  fullname:any;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.fullname=localStorage.getItem("fname");
  
  }

  //logout
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
