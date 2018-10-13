import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulExchangesComponent } from './successful-exchanges.component';

describe('SuccessfulExchangesComponent', () => {
  let component: SuccessfulExchangesComponent;
  let fixture: ComponentFixture<SuccessfulExchangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulExchangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
