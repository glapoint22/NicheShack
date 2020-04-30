import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePropertyComponent } from './image-property.component';

describe('ImagePropertyComponent', () => {
  let component: ImagePropertyComponent;
  let fixture: ComponentFixture<ImagePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
