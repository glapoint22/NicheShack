import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMediaComponent } from './product-media.component';

describe('ProductMediaComponent', () => {
  let component: ProductMediaComponent;
  let fixture: ComponentFixture<ProductMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
