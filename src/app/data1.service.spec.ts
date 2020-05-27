import { TestBed } from '@angular/core/testing';

import { Data1Service } from './data1.service';

describe('Data1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Data1Service = TestBed.get(Data1Service);
    expect(service).toBeTruthy();
  });
});
