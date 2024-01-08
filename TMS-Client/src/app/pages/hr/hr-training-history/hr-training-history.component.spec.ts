import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTrainingHistoryComponent } from './hr-training-history.component';

describe('HrTrainingHistoryComponent', () => {
  let component: HrTrainingHistoryComponent;
  let fixture: ComponentFixture<HrTrainingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrTrainingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrTrainingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
