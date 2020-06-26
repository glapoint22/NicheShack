import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUrlFormComponent } from './video-url-form.component';

describe('VideoUrlFormComponent', () => {
  let component: VideoUrlFormComponent;
  let fixture: ComponentFixture<VideoUrlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUrlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
