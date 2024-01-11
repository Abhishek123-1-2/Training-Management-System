import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmployeeHistoryComponent } from './manager-employee-history.component';

describe('ManagerEmployeeHistoryComponent', () => {
  let component: ManagerEmployeeHistoryComponent;
  let fixture: ComponentFixture<ManagerEmployeeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerEmployeeHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEmployeeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
