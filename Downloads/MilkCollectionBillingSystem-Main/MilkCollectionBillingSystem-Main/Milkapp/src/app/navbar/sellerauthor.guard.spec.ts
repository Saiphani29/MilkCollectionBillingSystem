import { TestBed } from '@angular/core/testing';

import { SellerauthorGuard } from './sellerauthor.guard';

describe('SellerauthorGuard', () => {
  let guard: SellerauthorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerauthorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
