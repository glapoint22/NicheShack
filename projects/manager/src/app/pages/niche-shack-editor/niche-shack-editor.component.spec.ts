import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicheShackEditorComponent } from './niche-shack-editor.component';

describe('NicheShackEditorComponent', () => {
  let component: NicheShackEditorComponent;
  let fixture: ComponentFixture<NicheShackEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicheShackEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicheShackEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
