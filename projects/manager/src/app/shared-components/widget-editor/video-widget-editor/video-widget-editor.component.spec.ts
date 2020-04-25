import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWidgetEditorComponent } from './video-widget-editor.component';

describe('VideoWidgetEditorComponent', () => {
  let component: VideoWidgetEditorComponent;
  let fixture: ComponentFixture<VideoWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
