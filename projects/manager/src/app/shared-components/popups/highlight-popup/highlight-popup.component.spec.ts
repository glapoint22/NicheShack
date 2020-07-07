import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightPopupComponent } from './highlight-popup.component';

describe('HighlightPopupComponent', () => {
  let component: HighlightPopupComponent;
  let fixture: ComponentFixture<HighlightPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
