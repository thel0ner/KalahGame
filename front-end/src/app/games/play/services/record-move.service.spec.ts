import { TestBed } from '@angular/core/testing';

import { RecordMoveService } from './record-move.service';

describe('RecordMoveService', () => {
  let service: RecordMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
