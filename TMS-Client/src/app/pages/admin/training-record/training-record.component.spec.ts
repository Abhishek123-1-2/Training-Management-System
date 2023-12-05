import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRecordComponent } from './training-record.component';

describe('TrainingRecordComponent', () => {
  let component: TrainingRecordComponent;
  let fixture: ComponentFixture<TrainingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
