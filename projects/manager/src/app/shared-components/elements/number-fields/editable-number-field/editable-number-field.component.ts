import { Component, Output, EventEmitter } from '@angular/core';
import { NumberFieldComponent } from '../number-field/number-field.component';

@Component({
  selector: 'editable-number-field',
  templateUrl: '../number-field/number-field.component.html',
  styleUrls: ['../number-field/number-field.component.scss', './editable-number-field.component.scss']
})
export class EditableNumberFieldComponent extends NumberFieldComponent {
  @Output() onSliderDown: EventEmitter<boolean> = new EventEmitter();

  ngOnChanges(){}

  onInput(event) {
    let input = event.target;

    // Only accept numeric values
    !(/^[0-9]+$/ig).test(input.value) ? input.value = input.value.replace(/[^0-9]+$/ig, '') : null;
  }

  onMousedown(mouseEvent: MouseEvent) {
    let usingSlider: boolean;
    let input = mouseEvent.target as HTMLInputElement;

    // If not already in edit mode, prevent the input's default actions
    if (!this.inEditMode) mouseEvent.preventDefault();

    this.onSliderDown.emit(true);

    // On Mouse Move
    let onMousemove = (e: MouseEvent) => {
      if(this.inEditMode) return;
      // Flag that we are using the slider
      usingSlider = true;

      // Update the value based on the mouse movement on the x axis
      this.updateValue(e.movementX);
    }





    // On Mouse Up
    let onMouseup = () => {

      this.onSliderDown.emit(false);

      // If not using the slider and not in edit mode
      if (!usingSlider && !this.inEditMode) {
        // Flag that we are now in edit mode
        this.inEditMode = true;

        // Select the text
        input.select();



        // On Key Down
        let onkeydown = (keyboardEvent: KeyboardEvent) => {
          // input.value = /^\d*$/.test(input.value);

          


          // If escape or enter has been pressed
          if (keyboardEvent.code == 'Escape' || keyboardEvent.code == 'NumpadEnter' || keyboardEvent.code == 'Enter') {
            // Flag that we are no longer in edit mode
            this.inEditMode = false;
            input.blur();

            // Enter has been pressed
            if (keyboardEvent.code == 'NumpadEnter' || keyboardEvent.code == 'Enter') {
              // Update and emit the value
              if(!input.value) {
                this.value = 0;
              } else {
                this.value = this.parseValue(input.value);
              }
              
              this.onValueChange.emit(this.value);
            } else {

              // Escape has been pressed
              if (keyboardEvent.code == 'Escape') {
                // Reset the value
                input.value = this.value.toString();
              }
            }

            // Remove the selection & keydown listener
            window.getSelection().removeAllRanges();
            mouseEvent.target.removeEventListener('keydown', onkeydown);

          }
        }

        // Add the keydown listener
        mouseEvent.target.addEventListener('keydown', onkeydown);

      }

      // Remove the listeners
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);

  }


  parseValue(value: string) {
    return parseInt(value)
  }


  updateValue(delta: number) {
    // This will update the value based on the delta
    this.value = Math.max(0, this.value + delta);

    // Emit the new value
    this.onValueChange.emit(this.value);
  }
}