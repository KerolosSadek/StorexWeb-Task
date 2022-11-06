import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsg: string = '';

  LoginForm = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required, Validators.pattern(/.{5,}/)]),
  });

  constructor(private AuthService: AuthService,private router: Router,) { }

  ngOnInit(): void {
  }

  onSignIn(LoginForm: UntypedFormGroup) {
    if (LoginForm.valid) { this.AuthService.login(LoginForm.value).subscribe({
        next: (res: any) => {
          if (res.status === "success") {
            this.router.navigate(['home']);
          } else {
            this.errMsg = res?.message;
          }
        },
        error: (error) => {
          this.errMsg = error?.message;
        }
      });
    } else {
      this.errMsg = "from is invalid";
    }
  }

}
