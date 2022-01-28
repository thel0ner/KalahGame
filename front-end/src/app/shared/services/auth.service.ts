import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInResponseDTO } from '../types/sign-in-response-dto.type';
import { SigninDTO } from '../types/signin-dto.type';
import { SignUpDTO } from '../types/signup-dto.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public signUp(payload: SignUpDTO):Observable<any>{
    const url = `${environment.webservices.auth}/signup`;
    return this.httpClient.post(url,payload);
  }

  public signin(payload: SigninDTO):Observable<SignInResponseDTO>{
    const url = `${environment.webservices.auth}/signin`;
    return this.httpClient.post<SignInResponseDTO>(url,payload);
  }
}
