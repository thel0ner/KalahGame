import { Injectable } from '@angular/core';
import * as CryptoGraphy from 'crypto-js';
import { SignInResponseDTO } from '../types/sign-in-response-dto.type';
import { UserStateService } from './user-state.service';
@Injectable({
  providedIn: 'root'
})
export class JWTService {

  private readonly storageKey = 'info';
  private readonly passPhrase = 'JesusIsMySavior';

  constructor(
    private userStateService: UserStateService,
  ) { }

  public isTokenStored(): boolean {
    const token = sessionStorage.getItem(this.storageKey);
    return token !== null;
  }

  public getInfo(): SignInResponseDTO | undefined {
    const token = sessionStorage.getItem(this.storageKey);
    if (token) {
      const response = CryptoGraphy.AES.decrypt(token, this.passPhrase.trim()).toString(CryptoGraphy.enc.Utf8);
      return JSON.parse(response);
    }
    return undefined;
  }

  public storeInfo(inpt: SignInResponseDTO): void {
    const converted = JSON.stringify(inpt);
    const encrypted = CryptoGraphy.AES.encrypt(converted, this.passPhrase.trim()).toString();
    sessionStorage.setItem(this.storageKey, encrypted);
  }

  public destory(): void {
    sessionStorage.clear();
    this.userStateService.state = false;
  }

}
