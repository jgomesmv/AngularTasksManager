import { TestBed } from '@angular/core/testing';

import { PendingTaskDataSource } from './pending-task-data-source.service';

describe('PendingTaskDataSource', () => {
  let service: PendingTaskDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingTaskDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
