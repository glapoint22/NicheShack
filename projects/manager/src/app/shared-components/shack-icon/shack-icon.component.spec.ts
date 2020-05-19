import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShackIconComponent } from './shack-icon.component';

describe('ShackIconComponent', () => {
  let component: ShackIconComponent;
  let fixture: ComponentFixture<ShackIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShackIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShackIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
