import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicheEditorComponent } from './niche-editor.component';

describe('NicheEditorComponent', () => {
  let component: NicheEditorComponent;
  let fixture: ComponentFixture<NicheEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicheEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicheEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
