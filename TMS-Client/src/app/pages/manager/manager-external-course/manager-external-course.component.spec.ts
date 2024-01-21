import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerExternalCourseComponent } from './manager-external-course.component';

describe('ManagerExternalCourseComponent', () => {
  let component: ManagerExternalCourseComponent;
  let fixture: ComponentFixture<ManagerExternalCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerExternalCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerExternalCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
