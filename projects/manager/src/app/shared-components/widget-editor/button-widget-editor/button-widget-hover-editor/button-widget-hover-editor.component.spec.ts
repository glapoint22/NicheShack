import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWidgetHoverEditorComponent } from './button-widget-hover-editor.component';

describe('ButtonWidgetHoverEditorComponent', () => {
  let component: ButtonWidgetHoverEditorComponent;
  let fixture: ComponentFixture<ButtonWidgetHoverEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWidgetHoverEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetHoverEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
