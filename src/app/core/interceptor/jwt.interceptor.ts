import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { AppLoadingService } from './../app-loading.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    requestCount = 0;

    constructor( private router: Router,private AuthService: AuthService,private AppLoadingService: AppLoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.AuthService.userInfo.value;
        let header = {};
        this.AppLoadingService.showLoading();
        this.requestCount++;

        if (token) {
            header['Authorization'] = `Bearer ${token}`;
        }
        request = request.clone({
            setHeaders: header
        });
        return next.handle(request).pipe(
            finalize(() => {
                this.requestCount--;
                if (this.requestCount === 0) {
                    this.AppLoadingService.hideLoading();
                }
            })
        );
    }

}
