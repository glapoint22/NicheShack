import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageNotificationPopupComponent } from './product-image-notification-popup.component';

describe('ProductImageNotificationPopupComponent', () => {
  let component: ProductImageNotificationPopupComponent;
  let fixture: ComponentFixture<ProductImageNotificationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageNotificationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
