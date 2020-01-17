import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.scss']
})
export class ButtonTextComponent {
  constructor(public _FormService: FormService) { }


  // ------------------------( ON FONT SIZE DROPDOWN CHANGE )------------------------- \\
  onFontSizeDropdownChange(e) {
    // Update the value of the input text when a change is made with the dropdown
    e.target.nextElementSibling.children[0].value = e.target.value;
    // Update formservice font size
    this._FormService.text.fontSize = e.target.value;
  }


  // ------------------------( ON FONT SIZE DOWN )------------------------- \\
  onFontSizeDown(e) {
    var index: number = -1;

    // loop through all the dropdown options
    for (var i = 0; i < e.target.options.length; i++) {
      // If we come across an option in the list that matches the value that's currently in the input text
      if (e.target.nextElementSibling.children[0].value == e.target.options[i].value) {
        // Record the index of that option
        index = i;
        break;
      }
    }
    // If no dropdown option matches the current input text value
    if (index == -1) {
      // Update the first dropdown option to have a value of the input text
      e.target.options[0] = new Option(e.target.nextElementSibling.children[0].value, e.target.nextElementSibling.children[0].value, false, true)

    // If a match was found
    } else {

      // Select that option
      e.target.selectedIndex = index;
    }
  }


  // ------------------------( ON FONT SIZE INPUT ARROW UP )------------------------- \\
  onFontSizeInputArrowUp(e) {
    e.target.value++;
    this._FormService.text.fontSize = e.target.value;
  }


  // ------------------------( ON FONT SIZE INPUT ARROW DOWN )------------------------- \\
  onFontSizeInputArrowDown(e) {
    e.target.value--;
    e.target.value = Math.max(1, e.target.value);
    this._FormService.text.fontSize = e.target.value;
  }


  // ------------------------( ON BOLD CLICK )------------------------- \\
  onBoldClick() {
    if(this._FormService.text.fontWeight == "bold") {
      this._FormService.text.fontWeight = "normal";
    }else {
      this._FormService.text.fontWeight = "bold";
    }
  }


  // ------------------------( ON ITALIC CLICK )------------------------- \\
  onItalicClick() {
    if(this._FormService.text.fontStyle == "italic") {
      this._FormService.text.fontStyle = "normal";
    }else {
      this._FormService.text.fontStyle = "italic";
    }
  }
}