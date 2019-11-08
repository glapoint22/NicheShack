import { HideDirective } from './hide.directive';
import { ElementRef } from '@angular/core';

describe('HideDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef;
    const directive = new HideDirective(el);
    expect(directive).toBeTruthy();
  });
});
