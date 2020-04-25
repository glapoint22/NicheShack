import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWidgetEditorComponent } from './categories-widget-editor.component';

describe('CategoriesWidgetEditorComponent', () => {
  let component: CategoriesWidgetEditorComponent;
  let fixture: ComponentFixture<CategoriesWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
