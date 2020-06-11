import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContentNotificationPopupComponent } from './product-content-notification-popup.component';

describe('ProductContentNotificationPopupComponent', () => {
  let component: ProductContentNotificationPopupComponent;
  let fixture: ComponentFixture<ProductContentNotificationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductContentNotificationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContentNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
