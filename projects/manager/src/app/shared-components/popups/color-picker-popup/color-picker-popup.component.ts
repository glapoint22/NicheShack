import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Color } from '../../../classes/color';
import { HSL } from '../../../classes/hsl';
import { HSB } from '../../../classes/hsb';
import { CoverService } from '../../../services/cover.service';

@Component({
  selector: 'color-picker-popup',
  templateUrl: './color-picker-popup.component.html',
  styleUrls: ['./color-picker-popup.component.scss'],
})
export class ColorPickerPopupComponent {
  public hue: number;
  public red: number;
  public hex: string;
  public blue: number;
  public green: number;
  public alpha: number;
  public ringX: number;
  public ringY: number;
  public hexFocus: boolean;
  public editMode: boolean;
  public ringDark: boolean;
  public hueSliderY: number;
  constructor(public cover: CoverService) { }
  @ViewChild('hueContainer', { static: false }) hueContainer: ElementRef;
  @ViewChild('colorContainer', { static: false }) colorContainer: ElementRef;
  




  // ngOnInit() {
  //   // this._FormService.onColorPickerClose.subscribe((canceled: boolean) => {
  //   //   if (canceled) this._FormService.colorPicker.copy(this._FormService.initialColorPickerColor);
  //   // });
  // }

  // // -----------------------------( ON FORM OPEN )------------------------------ \\
  // onFormOpen() {
  //   window.setTimeout(() => {
  //     // let hsl: HSL = this._FormService.colorPicker.toHSL();
  //     // let hsb: HSB = this._FormService.colorPicker.toHSB();

  //     // Set the current color
  //     // this._FormService.initialColorPickerColor.copy(this._FormService.colorPicker);

  //     // Move the ring
  //     // this.ringX = hsb.s;
  //     // this.ringY = 100 - hsb.b;

  //     // Move the hue slider   
  //     // this.hueSliderY = Math.round((249 - ((hsl.h * 360) / 1.422924901185771)));

  //     // Move the alpha slider
  //     // this.alphaSliderY = 249 - (((this._FormService.colorPicker.a * 100) / 0.3952569169960474));

  //     // Set the rgb
  //     this.setRGB()

  //     // Set a
  //     this.setA(false)
  //   })
  // }


  // -----------------------------( COLOR DOWN )------------------------------ \\
  colorDown(e: MouseEvent) {
    let setColor = (e: MouseEvent) => {
      let colorContainerLeft: number = this.colorContainer.nativeElement.getBoundingClientRect().x;
      let colorContainerTop: number = this.colorContainer.nativeElement.getBoundingClientRect().y;
      let colorContainerWidth: number = this.colorContainer.nativeElement.offsetWidth;
      let colorContainerHeight: number = this.colorContainer.nativeElement.offsetHeight;
      let cursorPosX: number = e.clientX - colorContainerLeft;
      let cursorPosY: number = e.clientY - colorContainerTop;
      let cursorPercentageX: number = Math.round((cursorPosX / colorContainerWidth) * 100);
      let cursorPercentageY: number = Math.round((cursorPosY / colorContainerHeight) * 100);
      this.ringX = cursorPercentageX;
      this.ringY = cursorPercentageY;
      if (this.ringX <= 0) this.ringX = 0;
      if (this.ringX >= 100) this.ringX = 100;
      if (this.ringY <= 0) this.ringY = 0;
      if (this.ringY >= 100) this.ringY = 100;
      this.setRGB();
    }
    setColor(e);
    this.cover.showPointerCover = true;
    // Moving the ring
    let ringMove = (e: MouseEvent) => {
      setColor(e);
    }
    // Stop moving the ring
    let ringMoveEnd = () => {
      this.cover.showPointerCover = false;
      window.removeEventListener("mousemove", ringMove);
      window.removeEventListener("mouseup", ringMoveEnd);
    }
    // Add event listeners
    window.addEventListener("mousemove", ringMove);
    window.addEventListener("mouseup", ringMoveEnd);
  }


  // -----------------------------( HUE DOWN )------------------------------ \\
  hueDown(e: MouseEvent) {
    let setHue = (e: MouseEvent) => {
      this.hueSliderY = e.clientY - this.hueContainer.nativeElement.getBoundingClientRect().y - 3;
      if (this.hueSliderY <= 0) this.hueSliderY = 0;
      if (this.hueSliderY >= this.hueContainer.nativeElement.getBoundingClientRect().height - 7) this.hueSliderY = this.hueContainer.nativeElement.getBoundingClientRect().height - 7;
      this.setRGB();
    }
    setHue(e)
    this.cover.showPointerCover = true;
    // Moving the hue slider
    let hueSliderMove = (e: MouseEvent) => {
      setHue(e);
    }
    // Stop moving the hue slider
    let hueSliderMoveEnd = () => {
      this.cover.showPointerCover = false;
      window.removeEventListener("mousemove", hueSliderMove);
      window.removeEventListener("mouseup", hueSliderMoveEnd);
    }
    // Add event listeners
    window.addEventListener("mousemove", hueSliderMove);
    window.addEventListener("mouseup", hueSliderMoveEnd);
  }


  // -----------------------------( SET RGB )------------------------------ \\
  setRGB(activeElement?: string) {
    let hueContainerHeight = this.hueContainer.nativeElement.getBoundingClientRect().height - 7;
    let magicNumber = 360 / hueContainerHeight;
    let hue = 360 - Math.round(this.hueSliderY * magicNumber);
    let hsb: HSB = new HSB(hue, this.ringX, 100 - this.ringY);
    let hsl: HSL = hsb.toHSL();
    let rgbColor: Color = Color.HSLToRGB(hsl.h / 360, hsl.s / 100, hsl.l / 100);
    let hex: string = rgbColor.toHex();

    // Update the Color Palette
    this.hue = hsl.h;

    //Update the input fields
    if (activeElement != "hex") this.hex = hex;
    // this._FormService.colorPicker.r = rgbColor.r;
    if (activeElement != "red") this.red = Math.round(((rgbColor.r / 2.55) / 100) * 100) / 100;
    // this._FormService.colorPicker.g = rgbColor.g;
    if (activeElement != "green") this.green = Math.round(((rgbColor.g / 2.55) / 100) * 100) / 100;
    // this._FormService.colorPicker.b = rgbColor.b;
    if (activeElement != "blue") this.blue = Math.round(((rgbColor.b / 2.55) / 100) * 100) / 100;

    //Set the ring color
    if (this.ringY < 50) {
      if (this.ringX > 50) {
        if (hsl.h > 200 || hsl.h < 25) {
          this.ringDark = false;
        } else {
          this.ringDark = true;
        }
      } else {
        this.ringDark = true;
      }
    } else {
      this.ringDark = false;
    }
  }


  // -----------------------------( ON HEX INPUT CLICK )------------------------------ \\
  onHexInputClick(hexInput) {
    window.setTimeout(() => {
      if (!this.editMode) {
        this.editMode = true;
        hexInput.select();
      }
    })
  }


  // -----------------------------( UPDATE RGB )------------------------------ \\
  updateRGB(activeElement: string) {
    // Move the ring
    this.setRingPosition(new Color((this.red * 2.55 * 100), (this.green * 2.55 * 100), (this.blue * 2.55 * 100), 1).toHSB());
    // Move the hue slider 
    this.setHueSliderPosition(new Color((this.red * 2.55 * 100), (this.green * 2.55 * 100), (this.blue * 2.55 * 100), 1).toHSL());
    // Set the rgb
    this.setRGB(activeElement);
  }


  // -----------------------------( UPDATE HEX )------------------------------ \\
  updateHex(hexInput) {
    //Only allow hex characters
    !(/^[0123456789abcdef]*$/i).test(hexInput.value) ? hexInput.value = hexInput.value.replace(/[^0123456789abcdef]/ig, '') : null;
    // Update the hex variable from the hex input
    this.hex = hexInput.value;
    // Move the ring
    this.setRingPosition(Color.HexToRGB("#" + this.hex).toHSB());
    // Move the hue slider 
    this.setHueSliderPosition(Color.HexToRGB("#" + this.hex).toHSL());
    // Set the rgb
    this.setRGB("hex");
  }


  // -----------------------------( SET RING POSITION )------------------------------ \\
  setRingPosition(hsb: HSB) {
    this.ringX = hsb.s;
    this.ringY = 100 - hsb.b;
  }


  // -----------------------------( SET HUE SLIDER POSITION )------------------------------ \\
  setHueSliderPosition(hsl: HSL) {
    let hueContainerHeight = this.hueContainer.nativeElement.getBoundingClientRect().height - 7;
    let magicNumber = 360 / hueContainerHeight;
    let hue = hsl.h * 360;
    this.hueSliderY = hueContainerHeight - (hue / magicNumber);
  }
}