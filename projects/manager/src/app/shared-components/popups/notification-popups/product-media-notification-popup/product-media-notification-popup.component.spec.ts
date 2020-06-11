import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMediaNotificationPopupComponent } from './product-media-notification-popup.component';

describe('ProductMediaNotificationPopupComponent', () => {
  let component: ProductMediaNotificationPopupComponent;
  let fixture: ComponentFixture<ProductMediaNotificationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMediaNotificationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMediaNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
