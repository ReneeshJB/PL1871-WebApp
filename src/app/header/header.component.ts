import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  fullName:any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fullName=sessionStorage.getItem("fullName");

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
