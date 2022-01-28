import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTService } from '../shared/services/jwt.service';
import { Roles } from '../shared/types/roles.enum';

@Injectable()
export class GamesGuard implements CanActivate {
  constructor(
    private jwtService: JWTService,
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwtService.isTokenStored()) {
      if(this.jwtService.getInfo()?.roles.includes(Roles.USER)){
        return true;
      }
    }
    this.router.navigate(['/auth/signin']);
    return false;
  }

}
