import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportDescriptionPopupComponent } from './product-report-description-popup.component';

describe('ProductReportDescriptionPopupComponent', () => {
  let component: ProductReportDescriptionPopupComponent;
  let fixture: ComponentFixture<ProductReportDescriptionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportDescriptionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportDescriptionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
