import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicheFormComponent } from './niche-form.component';

describe('NicheFormComponent', () => {
  let component: NicheFormComponent;
  let fixture: ComponentFixture<NicheFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicheFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
