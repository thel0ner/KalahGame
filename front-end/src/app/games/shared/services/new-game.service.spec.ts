import { TestBed } from '@angular/core/testing';

import { NewGameService } from './new-game.service';

describe('NewGameService', () => {
  let service: NewGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
