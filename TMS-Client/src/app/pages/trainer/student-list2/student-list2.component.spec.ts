import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentList2Component } from './student-list2.component';

describe('StudentList2Component', () => {
  let component: StudentList2Component;
  let fixture: ComponentFixture<StudentList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentList2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
