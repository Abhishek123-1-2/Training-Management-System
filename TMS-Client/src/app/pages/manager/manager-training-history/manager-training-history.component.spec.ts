import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTrainingHistoryComponent } from './manager-training-history.component';

describe('ManagerTrainingHistoryComponent', () => {
  let component: ManagerTrainingHistoryComponent;
  let fixture: ComponentFixture<ManagerTrainingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTrainingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerTrainingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
