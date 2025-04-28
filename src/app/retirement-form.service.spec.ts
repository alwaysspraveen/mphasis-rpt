import { TestBed } from '@angular/core/testing';

import { RetirementDataService } from './retirement-form.service';

describe('RetirementFormService', () => {
  let service: RetirementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetirementDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
