import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowEditorComponent } from './row-editor.component';

describe('RowEditorComponent', () => {
  let component: RowEditorComponent;
  let fixture: ComponentFixture<RowEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
