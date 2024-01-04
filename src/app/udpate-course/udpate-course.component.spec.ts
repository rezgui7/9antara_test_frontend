import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdpateCourseComponent } from './udpate-course.component';

describe('UdpateCourseComponent', () => {
  let component: UdpateCourseComponent;
  let fixture: ComponentFixture<UdpateCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UdpateCourseComponent]
    });
    fixture = TestBed.createComponent(UdpateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
