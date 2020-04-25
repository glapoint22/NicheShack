import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWidgetNormalEditorComponent } from './button-widget-normal-editor.component';

describe('ButtonWidgetNormalEditorComponent', () => {
  let component: ButtonWidgetNormalEditorComponent;
  let fixture: ComponentFixture<ButtonWidgetNormalEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWidgetNormalEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetNormalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
