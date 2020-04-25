import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWidgetEditorComponent } from './text-widget-editor.component';

describe('TextWidgetEditorComponent', () => {
  let component: TextWidgetEditorComponent;
  let fixture: ComponentFixture<TextWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
