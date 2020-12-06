import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupsFormComponent } from './subgroups-form.component';

describe('SubgroupsFormComponent', () => {
  let component: SubgroupsFormComponent;
  let fixture: ComponentFixture<SubgroupsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgroupsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
