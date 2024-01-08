import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationstatusDetailsComponent } from './confirmationstatus-details.component';

describe('ConfirmationstatusDetailsComponent', () => {
  let component: ConfirmationstatusDetailsComponent;
  let fixture: ComponentFixture<ConfirmationstatusDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationstatusDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationstatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
