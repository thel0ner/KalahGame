import { TestBed } from '@angular/core/testing';

import { RefreshStateService } from './refresh-state.service';

describe('RefreshStateService', () => {
  let service: RefreshStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
