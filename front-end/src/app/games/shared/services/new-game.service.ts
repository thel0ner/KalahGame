import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewGameService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public startNewGame():Observable<{id:string}>{
    const url = `${environment.webservices.games}/start`;
    return this.httpClient.get<{id:string}>(url);
  }
}
