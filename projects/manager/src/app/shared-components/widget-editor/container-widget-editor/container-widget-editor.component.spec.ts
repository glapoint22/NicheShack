import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerWidgetEditorComponent } from './container-widget-editor.component';

describe('ContainerWidgetEditorComponent', () => {
  let component: ContainerWidgetEditorComponent;
  let fixture: ComponentFixture<ContainerWidgetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerWidgetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerWidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
