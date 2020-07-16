import { Component, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'editable-dropdown',
  templateUrl: './editable-dropdown.component.html',
  styleUrls: ['../dropdown/dropdown.component.scss', './editable-dropdown.component.scss']
})
export class EditableDropdownComponent extends DropdownComponent {
  public textInputHasFocus: boolean = false;
  @ViewChild('textInput', { static: false }) textInput: ElementRef;


  // ----------------------------------------------------( BUILD MENU )------------------------------------------- \\
  buildMenu(dropdown: HTMLElement) {
    this.dropdownMenuService.buildMenu(this, dropdown, true, this.dropdownList, this.onMenuOptionSelect, this.onArrowKeyDown, this.restoreSelectedIndexValue);
  }


  // -------------------------------------------------( ON TEXT INPUT FOCUS )--------------------------------------- \\
  onTextInputFocus() {
    this.textInputHasFocus = true;
    // Add the listener for the keydown
    window.addEventListener('keydown', this.onKeyDown);
  }


  // --------------------------------------------------( ON TEXT INPUT BLUR )--------------------------------------- \\
  onTextInputBlur() {
    this.textInputHasFocus = false;
    // If the text input is empty
    if (this.textInput.nativeElement.value.length == 0) {
      // Wait to see if the text input gets populated
      window.setTimeout(() => {
        // If the text input does NOT get populated, update the text input with the last menu option that was selected
        this.textInput.nativeElement.value = this.dropdownList[this.selectedIndex].key
      }, 200)
    }
    // Remove the listener for the keydown
    window.removeEventListener('keydown', this.onKeyDown);
  }


  // --------------------------------------------------( ON TEXT INPUT CHANGE )-------------------------------------- \\
  onTextInputChange() {
    !(/^[0-9]+$/ig).test(this.textInput.nativeElement.value) ? this.textInput.nativeElement.value = this.textInput.nativeElement.value.replace(/[^0-9]+$/ig, '') : null;
  }


  // ------------------------------------------------------( ON KEY DOWN )----------------------------------------- \\
  private onKeyDown = (event: KeyboardEvent) => {
    // If the 'Enter' key is pressed
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode === 13) {
      // As long as the text input is NOT empty
      if (this.textInput.nativeElement.value.length != 0) {
        let textInputValue = this.textInput.nativeElement.value;
        let indexOfMenuOption = this.dropdownList.map(e => e.key).indexOf(textInputValue);

        // If the value that is being displayed in the text input is not within the list of options in the dropdown menu
        if (indexOfMenuOption == -1) {
          // Update the 'Other' option using the value that's in the text input
          this.dropdownList[0].key = textInputValue;
          this.dropdownList[0].value = textInputValue + "px";
          // Emit the value
          this.selectedIndex = 0;
          this.onChange.emit(this.dropdownList[0].value);
          
          // If the value that is being displayed in the text input is within the list of options in the dropdown menu 
        } else {
          // Emit the value
          this.selectedIndex = indexOfMenuOption;
          this.onChange.emit(this.dropdownList[indexOfMenuOption].value);
        }
        // Remove the listener
        window.removeEventListener('keydown', this.onKeyDown);
      }
    }

    // If the 'Escape' key is being pressed
    if (event.code === 'Escape' || event.keyCode === 27) {
      // Remove focus from the text input
      this.textInput.nativeElement.blur();
      // If the text input is empty
      if (this.textInput.nativeElement.value.length == 0) {
        // Update the text input with the last menu option that was selected
        this.textInput.nativeElement.value = this.dropdownList[this.selectedIndex].key
      }
      // Remove the listener
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }
}