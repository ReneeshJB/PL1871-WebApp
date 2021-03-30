import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  fullName: any;
  roleId: any;
  roleName: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fullName = sessionStorage.getItem("fullName");
    this.roleName = sessionStorage.getItem("roleName");

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  goHome() {
    console.log("going home");
    if (this.roleName == 'Admin') {
      this.router.navigateByUrl('/admin');
    } else if (this.roleId == 'HR') {
      this.router.navigateByUrl('/coordinator');
    }
  }

}
