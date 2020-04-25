import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupTypeComponent } from './product-group-type.component';

describe('ProductGroupTypeComponent', () => {
  let component: ProductGroupTypeComponent;
  let fixture: ComponentFixture<ProductGroupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
