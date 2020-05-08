import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWidgetHoverPropertiesComponent } from './button-widget-hover-properties.component';

describe('ButtonWidgetHoverPropertiesComponent', () => {
  let component: ButtonWidgetHoverPropertiesComponent;
  let fixture: ComponentFixture<ButtonWidgetHoverPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWidgetHoverPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetHoverPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
