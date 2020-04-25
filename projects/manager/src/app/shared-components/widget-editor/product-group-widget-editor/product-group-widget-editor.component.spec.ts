import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupWidgetEditorComponent } from './product-group-widget-editor.component';

describe('ProductGroupWidgetEditorComponent', () => {
  let component: ProductGroupWidgetEditorComponent;
  let fixture: ComponentFixture<ProductGroupWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
