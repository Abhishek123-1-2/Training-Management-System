import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHistoryComponent } from './training-history.component';

describe('TrainingHistoryComponent', () => {
  let component: TrainingHistoryComponent;
  let fixture: ComponentFixture<TrainingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
