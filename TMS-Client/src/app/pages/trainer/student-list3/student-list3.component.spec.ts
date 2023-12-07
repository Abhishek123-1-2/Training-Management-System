import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentList3Component } from './student-list3.component';

describe('StudentList3Component', () => {
  let component: StudentList3Component;
  let fixture: ComponentFixture<StudentList3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentList3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentList3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
