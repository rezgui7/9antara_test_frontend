import { TestBed } from '@angular/core/testing';

import { CourseResolverServiceService } from './course-resolver-service.service';

describe('CourseResolverServiceService', () => {
  let service: CourseResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
