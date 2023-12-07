import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingViewComponent } from './training-view.component';

describe('TrainingViewComponent', () => {
  let component: TrainingViewComponent;
  let fixture: ComponentFixture<TrainingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
