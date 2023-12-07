import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackToEmployeeComponent } from './feedback-to-employee.component';

describe('FeedbackToEmployeeComponent', () => {
  let component: FeedbackToEmployeeComponent;
  let fixture: ComponentFixture<FeedbackToEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackToEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
