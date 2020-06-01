import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Color } from '../../../classes/color';
import { HSL } from '../../../classes/hsl';
import { HSB } from '../../../classes/hsb';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'color-picker-popup',
  templateUrl: './color-picker-popup.component.html',
  styleUrls: ['./color-picker-popup.component.scss', '../popup/popup.component.scss'],
})

export class ColorPickerPopupComponent extends PopupComponent implements OnInit {
  public color: Color;
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
  @ViewChild('hueBar', { static: false }) hueBar: ElementRef;
  @ViewChild('colorPalette', { static: false }) colorPalette: ElementRef;



  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.colorPickerPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    window.setTimeout(() => {
      // Set the ring position
      this.setRingPosition(this.color.toHSB());
      // Set the hue slider position
      this.setHueSliderPosition(this.color.toHSL());
      // Set the RGB
      this.setRGB();
      // Set the alpha
      this.alpha = this.color.a;
    })
  }


  // -----------------------------( COLOR DOWN )------------------------------ \\
  colorDown(e: MouseEvent) {
    let setColor = (e: MouseEvent) => {
      let colorContainerLeft: number = this.colorPalette.nativeElement.getBoundingClientRect().x;
      let colorContainerTop: number = this.colorPalette.nativeElement.getBoundingClientRect().y;
      let colorContainerWidth: number = this.colorPalette.nativeElement.offsetWidth;
      let colorContainerHeight: number = this.colorPalette.nativeElement.offsetHeight;
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
      this.hueSliderY = e.clientY - this.hueBar.nativeElement.getBoundingClientRect().y - 3;
      if (this.hueSliderY <= 0) this.hueSliderY = 0;
      if (this.hueSliderY >= this.hueBar.nativeElement.getBoundingClientRect().height - 7) this.hueSliderY = this.hueBar.nativeElement.getBoundingClientRect().height - 7;
      this.hue = this.getHue();
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
    this.hue = this.getHue();
    let hsb: HSB = new HSB(this.hue, this.ringX, 100 - this.ringY);
    let hsl: HSL = hsb.toHSL();
    let rgbColor: Color = Color.HSLToRGB(hsl.h / 360, hsl.s / 100, hsl.l / 100);

    //Update the input fields
    if (activeElement != "hex") this.hex = rgbColor.toHex();
    this.color.r = rgbColor.r;
    if (activeElement != "red") this.red = Math.round(((rgbColor.r / 2.55) / 100) * 100) / 100;
    this.color.g = rgbColor.g;
    if (activeElement != "green") this.green = Math.round(((rgbColor.g / 2.55) / 100) * 100) / 100;
    this.color.b = rgbColor.b;
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


  // -----------------------------( UPDATE HEX INPUT )------------------------------ \\
  updateHexInput(hexInput) {
    //Only allow hex characters
    !(/^[0123456789abcdef]*$/i).test(hexInput.value) ? hexInput.value = hexInput.value.replace(/[^0123456789abcdef]/ig, '') : null;
    // Update the hex variable from the hex input
    this.hex = hexInput.value;
    // Move the ring
    this.setRingPosition(Color.hexToRGB("#" + this.hex).toHSB());
    // Move the hue slider 
    this.setHueSliderPosition(Color.hexToRGB("#" + this.hex).toHSL());
    // Set the rgb
    this.setRGB("hex");
  }


  // -----------------------------( SET RING POSITION )------------------------------ \\
  setRingPosition(hsb: HSB) {
    this.ringX = hsb.s;
    this.ringY = 100 - hsb.b;
  }


  // -----------------------------( GET HUE )------------------------------ \\
  getHue() {
    let hueContainerHeight = this.hueBar.nativeElement.getBoundingClientRect().height - 7;
    let magicNumber = 360 / hueContainerHeight;
    let hue = 360 - Math.round(this.hueSliderY * magicNumber);

    return hue;
  }


  // -----------------------------( SET HUE SLIDER POSITION )------------------------------ \\
  setHueSliderPosition(hsl: HSL) {
    let hueContainerHeight = this.hueBar.nativeElement.getBoundingClientRect().height - 7;
    let magicNumber = 360 / hueContainerHeight;
    let hue = hsl.h * 360;
    this.hueSliderY = hueContainerHeight - (hue / magicNumber);
  }
}