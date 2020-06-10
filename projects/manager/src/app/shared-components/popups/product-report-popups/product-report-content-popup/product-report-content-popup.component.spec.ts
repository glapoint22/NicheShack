import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportContentPopupComponent } from './product-report-content-popup.component';

describe('ProductReportContentPopupComponent', () => {
  let component: ProductReportContentPopupComponent;
  let fixture: ComponentFixture<ProductReportContentPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportContentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportContentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
