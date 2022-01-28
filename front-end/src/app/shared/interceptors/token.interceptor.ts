import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTService } from '../services/jwt.service';
import { tap } from 'rxjs/operators';
import { GlobalToastService } from '../services/global-toast.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JWTService,
    private globalToastService: GlobalToastService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.jwtService.isTokenStored()) {
      const token = this.jwtService.getInfo()?.accessToken;
      request = request.clone(
        {
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        }
      );
    }
    return next.handle(request).pipe(
      tap(
        _ => { },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.globalToastService.danger('Please sign in');
            this.jwtService.destory();
            this.router.navigate(['/auth/signin']);
          }
        }
      )
    );
  }
}
