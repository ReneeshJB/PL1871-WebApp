import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnquiryReportComponent } from './course-enquiry-report.component';

describe('CourseEnquiryReportComponent', () => {
  let component: CourseEnquiryReportComponent;
  let fixture: ComponentFixture<CourseEnquiryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEnquiryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnquiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
