import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKeywordsComponent } from './product-keywords.component';

describe('ProductKeywordsComponent', () => {
  let component: ProductKeywordsComponent;
  let fixture: ComponentFixture<ProductKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
