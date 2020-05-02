import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableNumberFieldComponent } from './editable-number-field.component';

describe('EditableNumberFieldComponent', () => {
  let component: EditableNumberFieldComponent;
  let fixture: ComponentFixture<EditableNumberFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableNumberFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
