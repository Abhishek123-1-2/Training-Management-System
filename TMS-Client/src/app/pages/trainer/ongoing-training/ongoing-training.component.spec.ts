import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTrainingComponent } from './ongoing-training.component';

describe('AssignedTrainingComponent', () => {
  let component: AssignedTrainingComponent;
  let fixture: ComponentFixture<AssignedTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
