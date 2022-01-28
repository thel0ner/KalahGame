import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot
} from '@angular/router';
import { EMPTY, iif, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ListService } from '../shared/services/list.service';

@Injectable()
export class PlayResolver implements Resolve<boolean> {
  constructor(
    private listService: ListService, 
    private router: Router,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean |any> {
    return of(route).pipe(
      map(route => route.params),
      map(params => params?.id),
      switchMap(id => this.listService.getListOfGames({page:0,pageSize:1,id})),
      switchMap(response => iif(
        () => response.games.length > 0,
        of(response.games[0]),
        throwError(new Error('skip'))
      )),
      catchError(error => of(error).pipe(
        tap(_ => console.log('error!!!')),
        tap(_ => this.router.navigate(['/games/list'])),
        switchMap(_ => EMPTY),
      )),
    );
  }
}
