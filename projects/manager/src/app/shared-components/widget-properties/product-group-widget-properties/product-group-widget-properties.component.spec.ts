import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupWidgetPropertiesComponent } from './product-group-widget-properties.component';

describe('ProductGroupWidgetEditorComponent', () => {
  let component: ProductGroupWidgetPropertiesComponent;
  let fixture: ComponentFixture<ProductGroupWidgetPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupWidgetPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupWidgetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
