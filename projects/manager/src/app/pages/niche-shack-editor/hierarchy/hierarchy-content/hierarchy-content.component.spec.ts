import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyContentComponent } from './hierarchy-content.component';

describe('HierarchyContentComponent', () => {
  let component: HierarchyContentComponent;
  let fixture: ComponentFixture<HierarchyContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
