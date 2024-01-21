import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalCourseComponent } from './external-course.component';

describe('ExternalCourseComponent', () => {
  let component: ExternalCourseComponent;
  let fixture: ComponentFixture<ExternalCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
