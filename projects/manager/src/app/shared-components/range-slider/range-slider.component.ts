import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})

export class RangeSliderComponent {
  public rangeSliderDown: boolean;
  @Input() minRange: number;
  @Input() maxRange: number;
  @Input() rowName: string = "";
  @Input() formServiceProperty: any;
  @Output() out: EventEmitter<number> = new EventEmitter();
  @ViewChild('txt', { static: false }) txt: ElementRef;
  
  // -------------------------( ON INPUT CHANGE )-------------------------- \\
  onInputChange() {
    //Only allow numeric characters
    !(/^[0123456789]*$/i).test(this.txt.nativeElement.value) ? this.txt.nativeElement.value = this.txt.nativeElement.value.replace(/[^0123456789]/ig, '') : null;

    // As long as the textbox is not empty and if the value in the textbox is lower than the specified min range
    if(this.txt.nativeElement.value != "" && this.txt.nativeElement.value < this.minRange) {
      // Set the textbox value as the min range
      this.txt.nativeElement.value = this.minRange;
    }

    if(this.maxRange != null) {
      // If the value of the textbox is higher than the specified max range
      if(this.txt.nativeElement.value > this.maxRange) {
        // Set the textbox value as the max range
        this.txt.nativeElement.value = this.maxRange;
      }
    }

    // Output the textbox value
    this.out.emit(this.txt.nativeElement.value);
  }

  
  // ------------------------( ON RANGE SLIDER DOWN )------------------------- \\
  onRangeSliderDown(e: MouseEvent) {
    var initialCursorPosX = e.clientX;
    var initialBorderWidth = this.txt.nativeElement.value;

    // Mark the range slider as being pressed down
    this.rangeSliderDown = true;


    // -- Range Slider Move -- \\
    let rangeSliderMove = (e: MouseEvent) => {
      // Update the textbox value based on the position of the range slider
      this.txt.nativeElement.value = Math.round(parseInt(initialBorderWidth) + ((e.clientX - initialCursorPosX) * 0.05));

      // If the value of the textbox is lower than the specified min range
      if(this.txt.nativeElement.value < this.minRange) {
        // Set the textbox value as the min range
        this.txt.nativeElement.value = this.minRange;
      }

      if(this.maxRange != null) {
        // If the value of the textbox is higher than the specified max range
        if(this.txt.nativeElement.value > this.maxRange) {
          // Set the textbox value as the max range
          this.txt.nativeElement.value = this.maxRange;
        }
      }
      
      // Output the textbox value
      this.out.emit(this.txt.nativeElement.value);
    }


    // -- Range Slider Move End -- \\
    let rangeSliderMoveEnd = () => {
      this.rangeSliderDown = false;
      window.removeEventListener("mousemove", rangeSliderMove);
      window.removeEventListener("mouseup", rangeSliderMoveEnd);
    }


    // Add event listeners that will listen for mousemove and mouseup
    window.addEventListener("mousemove", rangeSliderMove);
    window.addEventListener("mouseup", rangeSliderMoveEnd);
  }


  // -------------------------( ON BLUR )------------------------- \\
  onBlur() {
    if(this.txt.nativeElement.value == "") this.out.emit(1);
  }


  // ------------------------( GET WIDTH )------------------------- \\
  getWidth() {
    return screen.width;
  }


  // ------------------------( GET HEIGHT )------------------------- \\
  getHeight() {
    return screen.height;
  }
}