import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRequest1Component } from './training-request1.component';

describe('TrainingRequest1Component', () => {
  let component: TrainingRequest1Component;
  let fixture: ComponentFixture<TrainingRequest1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingRequest1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingRequest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
