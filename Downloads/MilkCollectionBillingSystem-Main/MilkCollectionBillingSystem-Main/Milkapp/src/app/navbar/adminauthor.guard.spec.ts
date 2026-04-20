import { TestBed } from '@angular/core/testing';

import { AdminauthorGuard } from './adminauthor.guard';

describe('AdminauthorGuard', () => {
  let guard: AdminauthorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminauthorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
