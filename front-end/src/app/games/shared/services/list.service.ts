import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GamesListRequestDTO } from '../types/games-list-dto.type';
import { GamesListDTO } from '../types/list-dto.type';

@Injectable()
export class ListService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getListOfGames(payload: GamesListRequestDTO): Observable<GamesListDTO> {
    const url = `${environment.webservices.games}/list`;
    let params = new HttpParams();
    params = params.append('page', payload.page);
    params = params.append('pageSize', payload.pageSize);
    if(payload.id) params = params.set('id', payload.id);
    return this.httpClient.get<GamesListDTO>(url, { params });
  }
}
