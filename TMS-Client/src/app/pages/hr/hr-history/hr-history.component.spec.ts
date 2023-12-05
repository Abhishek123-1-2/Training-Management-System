import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHistoryComponent } from './hr-history.component';

describe('HrHistoryComponent', () => {
  let component: HrHistoryComponent;
  let fixture: ComponentFixture<HrHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
