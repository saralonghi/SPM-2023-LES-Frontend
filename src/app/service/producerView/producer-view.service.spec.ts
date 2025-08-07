import { TestBed } from '@angular/core/testing';

import { ProducerViewService } from './producer-view.service';

describe('ProducerViewService', () => {
  let service: ProducerViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
