import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWidgetActivePropertiesComponent } from './button-widget-active-properties.component';

describe('ButtonWidgetActivePropertiesComponent', () => {
  let component: ButtonWidgetActivePropertiesComponent;
  let fixture: ComponentFixture<ButtonWidgetActivePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWidgetActivePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetActivePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
