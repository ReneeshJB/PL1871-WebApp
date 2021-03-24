import { Component, OnInit } from '@angular/core';

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

      fullname: ['', [Validators.required]],
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
    if (this.loginForm.invalid)
      return;

    //Form is valid
    if (this.loginForm.valid) {
      //calling method from webservice

      this.authService.loginVerify(this.loginForm.value)
        .subscribe(data => {
          console.log(data);

          //checking role base authentication
          if (data.roleid === 1) {
            localStorage.setItem("fullname", data.fullname);
            sessionStorage.setItem("fullname", data.fullname);
            localStorage.setItem("ACESS_ROLE", data.roleid.toString());
            this.router.navigateByUrl('/manager');

          }
          else if (data.roleid === 2) {
            localStorage.setItem("fullname", data.fullname);
            sessionStorage.setItem("fullname", data.fullname);
            localStorage.setItem("ACESS_ROLE", data.roleid.toString());
            this.router.navigateByUrl('/admin');

          }
          else {
            this.error = "Sorry... This Role is not allowed to the system";
          }

        },
          error => {
            this.error = "Invalid Username and password";
          }
        );

    }

  }


}
