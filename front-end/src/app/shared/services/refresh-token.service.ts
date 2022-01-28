import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RefreshTokenType } from '../types/refresh-token.type';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public requestRefreshToken(refreshToken: string): Observable<RefreshTokenType> {
    const url = `${environment.webservices.auth}/refreshToken`;
    return this.httpClient.post<RefreshTokenType>(url, { refreshToken });
  }
}
