import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTService } from '../shared/services/jwt.service';

@Injectable()

export class CanactivateGuard implements CanActivate {
  constructor(
    private jwtService: JWTService,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.jwtService.isTokenStored();
  }
  
}
