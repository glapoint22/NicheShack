import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportOtherPopupComponent } from './product-report-other-popup.component';

describe('ProductReportOtherPopupComponent', () => {
  let component: ProductReportOtherPopupComponent;
  let fixture: ComponentFixture<ProductReportOtherPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportOtherPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportOtherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
