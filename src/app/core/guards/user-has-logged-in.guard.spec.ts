import { TestBed } from '@angular/core/testing';

import { UserHasLoggedInGuard } from './user-has-logged-in.guard';

describe('UserHasLoggedInGuard', () => {
  let guard: UserHasLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserHasLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
