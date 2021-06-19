import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWidgetComponent } from './section-widget.component';

describe('SectionWidgetComponent', () => {
  let component: SectionWidgetComponent;
  let fixture: ComponentFixture<SectionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
