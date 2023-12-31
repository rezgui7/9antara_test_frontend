import { TestBed } from '@angular/core/testing';

import { ProcessingImageServiceService } from './processing-image-service.service';

describe('ProcessingImageServiceService', () => {
  let service: ProcessingImageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingImageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
