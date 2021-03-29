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
    this.roleId = sessionStorage.getItem("ACCESS_ROLE");
    this.roleName = sessionStorage.getItem("roleName");

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  goHome() {
    console.log("going home");
    if (this.roleId == 1) {
      this.router.navigateByUrl('/admin');
    } else if (this.roleId == 2) {
      this.router.navigateByUrl('/coordinator');
    } else if (this.roleId == 3) {
      this.router.navigateByUrl('/manager');
    }
  }

}
