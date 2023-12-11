import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTrainingComponent } from './completed-training.component';

describe('CompletedTrainingComponent', () => {
  let component: CompletedTrainingComponent;
  let fixture: ComponentFixture<CompletedTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
