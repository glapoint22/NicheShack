import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProportionalWidgetComponent } from './proportional-widget.component';

describe('ProportionalWidgetComponent', () => {
  let component: ProportionalWidgetComponent;
  let fixture: ComponentFixture<ProportionalWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProportionalWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProportionalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
