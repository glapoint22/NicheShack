import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportPopupComponent } from './product-report-popup.component';

describe('ProductReportPopupComponent', () => {
  let component: ProductReportPopupComponent;
  let fixture: ComponentFixture<ProductReportPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
