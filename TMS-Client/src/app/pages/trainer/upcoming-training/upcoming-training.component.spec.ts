import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTrainingComponent } from './upcoming-training.component';

describe('UpcomingTrainingComponent', () => {
  let component: UpcomingTrainingComponent;
  let fixture: ComponentFixture<UpcomingTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
