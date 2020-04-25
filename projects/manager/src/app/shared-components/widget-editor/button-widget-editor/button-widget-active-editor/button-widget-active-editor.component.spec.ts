import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWidgetActiveEditorComponent } from './button-widget-active-editor.component';

describe('ButtonWidgetActiveEditorComponent', () => {
  let component: ButtonWidgetActiveEditorComponent;
  let fixture: ComponentFixture<ButtonWidgetActiveEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWidgetActiveEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetActiveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
