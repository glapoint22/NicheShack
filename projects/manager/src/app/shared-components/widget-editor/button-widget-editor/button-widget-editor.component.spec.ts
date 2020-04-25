import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWidgetEditorComponent } from './button-widget-editor.component';

describe('ButtonWidgetEditorComponent', () => {
  let component: ButtonWidgetEditorComponent;
  let fixture: ComponentFixture<ButtonWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
