import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWidgetEditorComponent } from './carousel-widget-editor.component';

describe('CarouselWidgetEditorComponent', () => {
  let component: CarouselWidgetEditorComponent;
  let fixture: ComponentFixture<CarouselWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
