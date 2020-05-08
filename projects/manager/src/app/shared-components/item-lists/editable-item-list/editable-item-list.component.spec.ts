import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableItemListComponent } from './editable-item-list.component';

describe('EditableItemListComponent', () => {
  let component: EditableItemListComponent;
  let fixture: ComponentFixture<EditableItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
