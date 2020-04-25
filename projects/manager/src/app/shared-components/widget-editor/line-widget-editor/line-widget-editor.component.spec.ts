import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineWidgetEditorComponent } from './line-widget-editor.component';

describe('LineWidgetEditorComponent', () => {
  let component: LineWidgetEditorComponent;
  let fixture: ComponentFixture<LineWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
