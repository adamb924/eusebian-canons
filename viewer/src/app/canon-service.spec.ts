import { TestBed } from '@angular/core/testing';

import { CanonService } from './canon-service';

describe('CanonService', () => {
  let service: CanonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
