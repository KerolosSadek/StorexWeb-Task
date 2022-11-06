import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

// import jwtDecode from 'jwt-decode';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any = '';
  userInfo = new BehaviorSubject(null);
  user: any;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if (!token) return;
    this.userInfo.next(token);
  }

  register(formData: any) {
    return this.http.post(`https://test-api.storexweb.com/api/register`,formData)
  }

  login(formData: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/login`, formData).pipe(
      map((res: any) => {
        this.setToken(res.authorisation.token);
        return res;
      })
    );
  }

  deleteLocalStorage() {
    this.userInfo.next(null);
    localStorage.removeItem('token');
  }

  setToken(payload): void {
    localStorage.setItem('token', payload);
    this.userInfo.next(payload);
  }
}
