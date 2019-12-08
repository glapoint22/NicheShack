import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportFormComponent } from './product-report-form.component';

describe('ProductReportFormComponent', () => {
  let component: ProductReportFormComponent;
  let fixture: ComponentFixture<ProductReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
