import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupMenuComponent } from './product-group-menu.component';

describe('ProductGroupMenuComponent', () => {
  let component: ProductGroupMenuComponent;
  let fixture: ComponentFixture<ProductGroupMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
