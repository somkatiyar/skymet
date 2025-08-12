import { TestBed } from '@angular/core/testing';

import { PullToRefreshService } from './pull-to-refresh.service';

describe('PullToRefreshService', () => {
  let service: PullToRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PullToRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
