import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoveResponse } from '../types/move-response.type';

@Injectable()
export class MoveRecorderService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public recordMove(gameId: string, pitId: number): Observable<MoveResponse> {
    const url = `${environment.webservices.games}/move/${gameId}/${pitId}`;
    return this.httpClient.put<MoveResponse>(url,{});
  }

}
