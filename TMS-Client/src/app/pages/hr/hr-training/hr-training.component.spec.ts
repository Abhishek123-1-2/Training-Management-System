import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTrainingComponent } from './hr-training.component';

describe('HrTrainingComponent', () => {
  let component: HrTrainingComponent;
  let fixture: ComponentFixture<HrTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
