import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeformWidgetComponent } from './freeform-widget.component';

describe('FreeformWidgetComponent', () => {
  let component: FreeformWidgetComponent;
  let fixture: ComponentFixture<FreeformWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeformWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeformWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
