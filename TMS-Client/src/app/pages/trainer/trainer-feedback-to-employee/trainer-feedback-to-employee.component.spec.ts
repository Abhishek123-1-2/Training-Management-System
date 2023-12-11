import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFeedbackToEmployeeComponent } from './trainer-feedback-to-employee.component';

describe('TrainerFeedbackToEmployeeComponent', () => {
  let component: TrainerFeedbackToEmployeeComponent;
  let fixture: ComponentFixture<TrainerFeedbackToEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerFeedbackToEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerFeedbackToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
