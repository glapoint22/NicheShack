import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportImagePopupComponent } from './product-report-image-popup.component';

describe('ProductReportImagePopupComponent', () => {
  let component: ProductReportImagePopupComponent;
  let fixture: ComponentFixture<ProductReportImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
