import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFeedbackComponent } from './hr-feedback.component';

describe('HrFeedbackComponent', () => {
  let component: HrFeedbackComponent;
  let fixture: ComponentFixture<HrFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
