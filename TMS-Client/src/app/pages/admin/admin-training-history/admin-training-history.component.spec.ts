import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingHistoryComponent } from './admin-training-history.component';

describe('AdminTrainingHistoryComponent', () => {
  let component: AdminTrainingHistoryComponent;
  let fixture: ComponentFixture<AdminTrainingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
