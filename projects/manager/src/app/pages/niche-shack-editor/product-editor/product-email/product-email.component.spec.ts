import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEmailComponent } from './product-email.component';

describe('ProductEmailComponent', () => {
  let component: ProductEmailComponent;
  let fixture: ComponentFixture<ProductEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
