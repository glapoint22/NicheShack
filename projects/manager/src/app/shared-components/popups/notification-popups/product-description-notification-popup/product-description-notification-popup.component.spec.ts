import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionNotificationPopupComponent } from './product-description-notification-popup.component';

describe('ProductDescriptionNotificationPopupComponent', () => {
  let component: ProductDescriptionNotificationPopupComponent;
  let fixture: ComponentFixture<ProductDescriptionNotificationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDescriptionNotificationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDescriptionNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
