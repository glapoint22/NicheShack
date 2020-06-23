import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyCheckboxContentComponent } from './hierarchy-checkbox-content.component';

describe('HierarchyCheckboxContentComponent', () => {
  let component: HierarchyCheckboxContentComponent;
  let fixture: ComponentFixture<HierarchyCheckboxContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyCheckboxContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyCheckboxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
