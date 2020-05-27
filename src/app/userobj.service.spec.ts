import { TestBed } from '@angular/core/testing';

import { UserobjService } from './userobj.service';

describe('UserobjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserobjService = TestBed.get(UserobjService);
    expect(service).toBeTruthy();
  });
});
