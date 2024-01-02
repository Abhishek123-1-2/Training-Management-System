import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerTrainingDetailsComponent } from './trainer-training-details.component';

describe('TrainerTrainingDetailsComponent', () => {
  let component: TrainerTrainingDetailsComponent;
  let fixture: ComponentFixture<TrainerTrainingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerTrainingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerTrainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
