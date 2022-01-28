import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private sourceOfTruth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  set state(inpt: Observable<boolean> | boolean) {
    this.sourceOfTruth.next(<boolean>inpt);
  }

  get state(): Observable<boolean> | boolean {
    return this.sourceOfTruth.asObservable();
  }
}
