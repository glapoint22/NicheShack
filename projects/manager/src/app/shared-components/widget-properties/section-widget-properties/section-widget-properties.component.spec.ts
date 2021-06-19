import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWidgetPropertiesComponent } from './section-widget-properties.component';

describe('SectionWidgetPropertiesComponent', () => {
  let component: SectionWidgetPropertiesComponent;
  let fixture: ComponentFixture<SectionWidgetPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionWidgetPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionWidgetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
