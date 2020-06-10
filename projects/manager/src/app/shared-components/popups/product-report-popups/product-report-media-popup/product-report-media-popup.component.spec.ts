import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportMediaPopupComponent } from './product-report-media-popup.component';

describe('ProductReportMediaPopupComponent', () => {
  let component: ProductReportMediaPopupComponent;
  let fixture: ComponentFixture<ProductReportMediaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportMediaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportMediaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
