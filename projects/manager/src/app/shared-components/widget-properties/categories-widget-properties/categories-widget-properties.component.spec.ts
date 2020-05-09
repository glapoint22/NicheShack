import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWidgetPropertiesComponent } from './categories-widget-properties.component';

describe('CategoriesWidgetPropertiesComponent', () => {
  let component: CategoriesWidgetPropertiesComponent;
  let fixture: ComponentFixture<CategoriesWidgetPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesWidgetPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWidgetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
