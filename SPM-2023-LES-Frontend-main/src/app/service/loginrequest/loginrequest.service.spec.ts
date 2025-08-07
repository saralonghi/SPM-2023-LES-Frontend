import { TestBed } from '@angular/core/testing';

import { LoginrequestService } from './loginrequest.service';

describe('LoginrequestService', () => {
  let service: LoginrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
