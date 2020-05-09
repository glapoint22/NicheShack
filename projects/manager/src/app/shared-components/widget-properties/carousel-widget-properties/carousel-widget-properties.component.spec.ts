import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWidgetPropertiesComponent } from './carousel-widget-properties.component';

describe('CarouselWidgetPropertiesComponent', () => {
  let component: CarouselWidgetPropertiesComponent;
  let fixture: ComponentFixture<CarouselWidgetPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselWidgetPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWidgetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
