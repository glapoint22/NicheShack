import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointPopupComponent } from './price-point-popup.component';

describe('PricePointFormComponent', () => {
  let component: PricePointPopupComponent;
  let fixture: ComponentFixture<PricePointPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricePointPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePointPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
