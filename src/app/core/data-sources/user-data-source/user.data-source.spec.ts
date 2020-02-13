import { TestBed } from '@angular/core/testing';

import { UserDataSource } from './user.data-source';

describe('UserDataSource', () => {
  let service: UserDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
