import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWidgetEditorComponent } from './image-widget-editor.component';

describe('ImageWidgetEditorComponent', () => {
  let component: ImageWidgetEditorComponent;
  let fixture: ComponentFixture<ImageWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
