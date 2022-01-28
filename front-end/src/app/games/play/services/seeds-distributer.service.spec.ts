import { TestBed } from '@angular/core/testing';

import { SeedsDistributerService } from './seeds-distributer.service';

describe('SeedsDistributerService', () => {
  let service: SeedsDistributerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedsDistributerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
