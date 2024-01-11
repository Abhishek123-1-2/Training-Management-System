import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTrainingRecordComponent } from './manager-training-record.component';

describe('ManagerTrainingRecordComponent', () => {
  let component: ManagerTrainingRecordComponent;
  let fixture: ComponentFixture<ManagerTrainingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTrainingRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerTrainingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
