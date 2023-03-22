import { TestBed } from '@angular/core/testing';

import { ApproversService } from './approvers.service';

describe('ApproversService', () => {
  let service: ApproversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
