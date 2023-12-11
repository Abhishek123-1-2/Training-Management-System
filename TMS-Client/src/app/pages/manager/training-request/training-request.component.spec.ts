import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRequestComponent } from './training-request.component';

describe('TrainingRequestComponent', () => {
  let component: TrainingRequestComponent;
  let fixture: ComponentFixture<TrainingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
