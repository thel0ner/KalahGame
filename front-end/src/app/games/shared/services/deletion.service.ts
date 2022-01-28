import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DeletionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public deleteGame(id:string):Observable<any>{
    const url = `${environment.webservices.games}/remove/${id}`;
    return this.httpClient.delete(url);
  }
}
