import { TestBed } from '@angular/core/testing';

import { PlayResolver } from './play.resolver';

describe('PlayResolver', () => {
  let resolver: PlayResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PlayResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
