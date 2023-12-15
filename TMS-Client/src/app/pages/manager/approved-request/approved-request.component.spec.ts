import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRequestComponent } from './approved-request.component';

describe('ApprovedRequestComponent', () => {
  let component: ApprovedRequestComponent;
  let fixture: ComponentFixture<ApprovedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
