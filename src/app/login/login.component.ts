import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser?: User;
  uname: any;

  //loginUser: User

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    //Create a Reactive Form
    this.loginForm = this.fb.group({

      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });

  }

  //get controls for validation
  get formControls() {
    return this.loginForm.controls;
  }

  //Login Verify
  loginsCredentials() {
    this.isSubmitted = true;


    //Form is invalid
    if (this.loginForm.invalid){
      this.error = "Please enter User Name and Password"
      return;

    }

    //Form is valid
    if (this.loginForm.valid) {
      //calling method from webservice

      this.authService.loginVerify(this.loginForm.value)
        .subscribe(data => {

          console.log(data);
          if (data == null) {
            this.error = "Invalid User Name and password";
          }
          //checking role base authentication
          if (data.role.roleId === 1) {
            console.log("admin");
            sessionStorage.setItem("fullName", data.fullName);
            sessionStorage.setItem("ACESS_ROLE", data.role.roleId.toString());
            this.router.navigateByUrl('/admin');

          }
          else if (data.role.roleId === 2) {
            console.log("co-ordinator")
            sessionStorage.setItem("fullName", data.fullName);
            sessionStorage.setItem("ACESS_ROLE", data.role.roleId.toString());
            this.router.navigateByUrl('/coordinator');

          }
          else if (data.role.roleId == 3) {
            console.log("co-ordinator")
            sessionStorage.setItem("fullName", data.fullName);
            sessionStorage.setItem("ACESS_ROLE", data.role.roleId.toString());
            this.router.navigateByUrl('/manager');
          }
          else {
            this.error = "Sorry... This Role is not allowed to the system";
          }

        },
          error => {
            this.error = "Invalid User Name and Password";
          }
        );

    }

  }


}
