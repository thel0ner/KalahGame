import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class RefreshStateService {
  private sourceOfTruth: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { }

  set state(inpt: Observable<number> | number) {
    this.sourceOfTruth.next(<number>inpt);
  }

  get state(): Observable<number> | number {
    return this.sourceOfTruth.asObservable().pipe(
      filter(state => state > 0)
    );
  }
}
