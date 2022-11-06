import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth();
  }

  logout() {
    this.AuthService.deleteLocalStorage();
    this.router.navigate(['login']);
  }

  auth() {
    this.AuthService.userInfo.subscribe((res) => {
      if (res) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }
}
