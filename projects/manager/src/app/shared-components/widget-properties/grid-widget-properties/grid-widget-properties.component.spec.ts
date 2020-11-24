import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWidgetPropertiesComponent } from './grid-widget-properties.component';

describe('GridWidgetPropertiesComponent', () => {
  let component: GridWidgetPropertiesComponent;
  let fixture: ComponentFixture<GridWidgetPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridWidgetPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWidgetPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
