import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWidgetPropertiesComponent } from './shop-widget-properties.component';

describe('ShopWidgetPropertiesComponent', () => {
  let component: ShopWidgetPropertiesComponent;
  let fixture: ComponentFixture<ShopWidgetPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopWidgetPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopWidgetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
