import { Injectable } from '@angular/core';
import { Button } from 'classes/button';

@Injectable({
  providedIn: 'root'
})
export class CssButtonService {

  constructor() { }


  // ------------------------------------------------------------ Create Class -----------------------------------------------------------
  createClass(className: string, button: Button): string {
    return '.' + className + ' {' +
      button.background.getStyle() +
      button.border.getStyle() +
      button.caption.getStyle() +
      '\n\theight: ' + button.height + 'px;' +
      (button.width ? '\n\tmax-width: ' + button.width + 'px;' : '') +
      '\n}' +

      // Hover
      '\n.' + className + ':hover {' +
      button.backgroundHoverColor.getStyle() +
      (button.border.enable ? button.borderHoverColor.getStyle() : '') +
      button.textHoverColor.getStyle() +
      '\n}' +

      // Active
      '\n.' + className + ':active {' +
      button.backgroundActiveColor.getStyle() +
      (button.border.enable ? button.borderActiveColor.getStyle() : '') +
      button.textActiveColor.getStyle() +
      '\n}';
  }


  


  // ------------------------------------------------------------ Get Class Name -----------------------------------------------------------
  getClassName() {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
