import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBrowserPopupComponent } from './media-browser-popup.component';

describe('MediaBrowserComponent', () => {
  let component: MediaBrowserPopupComponent;
  let fixture: ComponentFixture<MediaBrowserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaBrowserPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBrowserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
