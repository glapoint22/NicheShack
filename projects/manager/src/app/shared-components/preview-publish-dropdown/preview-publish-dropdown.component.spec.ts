import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPublishDropdownComponent } from './preview-publish-dropdown.component';

describe('PreviewPublishDropdownComponent', () => {
  let component: PreviewPublishDropdownComponent;
  let fixture: ComponentFixture<PreviewPublishDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPublishDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPublishDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
