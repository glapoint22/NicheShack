import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPageEditorComponent } from './lead-page-editor.component';

describe('LeadPageEditorComponent', () => {
  let component: LeadPageEditorComponent;
  let fixture: ComponentFixture<LeadPageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadPageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadPageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
