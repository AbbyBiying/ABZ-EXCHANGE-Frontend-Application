import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulExchangeDetailComponent } from './successful-exchange-detail.component';

describe('SuccessfulExchangeDetailComponent', () => {
  let component: SuccessfulExchangeDetailComponent;
  let fixture: ComponentFixture<SuccessfulExchangeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulExchangeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulExchangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
