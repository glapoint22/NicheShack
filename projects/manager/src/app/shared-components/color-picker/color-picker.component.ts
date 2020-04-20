import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Color } from '../../classes/color';
import { HSL } from '../../classes/hsl';
import { HSB } from '../../classes/hsb';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})

export class ColorPickerComponent implements OnInit {
  @ViewChild('colorContainer', { static: false }) colorContainer: ElementRef;
  @ViewChild('hueContainer', { static: false }) hueContainer: ElementRef;
  @ViewChild('alphaContainer', { static: false }) alphaContainer: ElementRef;
  @ViewChild('redInput', { static: false }) redInput: ElementRef;
  @ViewChild('greenInput', { static: false }) greenInput: ElementRef;
  @ViewChild('blueInput', { static: false }) blueInput: ElementRef;
  @ViewChild('alphaInput', { static: false }) alphaInput: ElementRef;
  @ViewChild('hexInput', { static: false }) hexInput: ElementRef;
  public hex: string;
  public hue: number;
  public ringX: number;
  public ringY: number;
  public ringDark: boolean;
  public hueSliderY: number;
  public alphaSliderY: number;

  constructor(public _FormService: FormService) { }


  ngOnInit() {
    this._FormService.onColorPickerClose.subscribe((canceled: boolean) => {
      if (canceled) this._FormService.colorPicker.copy(this._FormService.initialColorPickerColor);
    });
  }

  // -----------------------------( ON FORM OPEN )------------------------------ \\
  onFormOpen() {
    window.setTimeout(() => {
      let hsl: HSL = this._FormService.colorPicker.toHSL();
      let hsb: HSB = this._FormService.colorPicker.toHSB();

      // Set the current color
      this._FormService.initialColorPickerColor.copy(this._FormService.colorPicker);

      // Move the ring
      this.ringX = hsb.s;
      this.ringY = 100 - hsb.b;

      // Move the hue slider   
      this.hueSliderY = Math.round((249 - ((hsl.h * 360) / 1.422924901185771)));

      // Move the alpha slider
      this.alphaSliderY = 249 - (((this._FormService.colorPicker.a * 100) / 0.3952569169960474));

      // Set the rgb
      this.setRGB()

      // Set a
      this.setA(false)
    })
  }


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
    // Moving the ring
    let ringMove = (e: MouseEvent) => {
      setColor(e);
    }
    // Stop moving the ring
    let ringMoveEnd = () => {
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
      this.hueSliderY = e.clientY - this.hueContainer.nativeElement.getBoundingClientRect().y - 5;
      if (this.hueSliderY <= -4) this.hueSliderY = -4;
      if (this.hueSliderY >= 249) this.hueSliderY = 249;
      this.setRGB();
    }
    setHue(e)
    // Moving the hue slider
    let hueSliderMove = (e: MouseEvent) => {
      setHue(e);
    }
    // Stop moving the hue slider
    let hueSliderMoveEnd = () => {
      window.removeEventListener("mousemove", hueSliderMove);
      window.removeEventListener("mouseup", hueSliderMoveEnd);
    }
    // Add event listeners
    window.addEventListener("mousemove", hueSliderMove);
    window.addEventListener("mouseup", hueSliderMoveEnd);
  }



  // -----------------------------( ALPHA DOWN )------------------------------ \\
  alphaDown(e: MouseEvent) {
    let setAlpha = (e: MouseEvent) => {
      this.alphaSliderY = e.clientY - this.alphaContainer.nativeElement.getBoundingClientRect().y - 5;
      if (this.alphaSliderY <= -4) this.alphaSliderY = -4;
      if (this.alphaSliderY >= 249) this.alphaSliderY = 249;
      this.setA(false);
    }
    setAlpha(e);
    // Moving the alpha slider
    let alphaSliderMove = (e: MouseEvent) => {
      setAlpha(e);
    }
    // Stop moving the alpha slider
    let alphaSliderMoveEnd = () => {
      window.removeEventListener("mousemove", alphaSliderMove);
      window.removeEventListener("mouseup", alphaSliderMoveEnd);
    }
    // Add event listeners
    window.addEventListener("mousemove", alphaSliderMove);
    window.addEventListener("mouseup", alphaSliderMoveEnd);
  }



  // -----------------------------( SET RGB )------------------------------ \\
  setRGB() {
    let hsb: HSB = new HSB((Math.round((249 - this.hueSliderY) * 1.422924901185771)), this.ringX, 100 - this.ringY);
    let hsl: HSL = hsb.toHSL();
    let rgbColor: Color = Color.HSLToRGB(hsl.h / 360, hsl.s / 100, hsl.l / 100);
    let hex: string = rgbColor.toHex();

    // Update the Color Palette
    this.hue = hsl.h;

    //Update the input fields
    this._FormService.colorPicker.r = rgbColor.r;
    if(document.activeElement != this.redInput.nativeElement) this.redInput.nativeElement.value = rgbColor.r;

    this._FormService.colorPicker.g = rgbColor.g;
    if(document.activeElement != this.greenInput.nativeElement) this.greenInput.nativeElement.value = rgbColor.g;

    this._FormService.colorPicker.b = rgbColor.b;
    if(document.activeElement != this.blueInput.nativeElement) this.blueInput.nativeElement.value = rgbColor.b;

    this.hex = hex;
    if(document.activeElement != this.hexInput.nativeElement) this.hexInput.nativeElement.value = hex;

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


  // ----------------------------------( SET A )---------------------------------- \\
  setA(isInput: boolean) {
    let a = Math.round((((249 - this.alphaSliderY) * 0.3952569169960474) / 100) * 100) / 100;

    this._FormService.colorPicker.a = a;
    if (!isInput) this.alphaInput.nativeElement.value = a;
  }


  // -----------------------------( ON INPUT CHANGE )------------------------------ \\
  onInputChange() {

    //If the input field is alpha
    if (this.alphaInput.nativeElement == document.activeElement) {

      //Only allow numeric characters
      !(/^[0123456789.]*$/i).test(this.alphaInput.nativeElement.value) ? this.alphaInput.nativeElement.value = this.alphaInput.nativeElement.value.replace(/[^0123456789.]/ig, '') : null;

      if (this.alphaInput.nativeElement.value > 1) this.alphaInput.nativeElement.value = 1;

      // Move the alpha slider
      this.alphaSliderY = 249 - (((this.alphaInput.nativeElement.value * 100) / 0.3952569169960474));

      this.setA(true);

    } else {
      let hsl: HSL;
      let hsb: HSB;

      //If the input field is hex
      if (this.hexInput.nativeElement == document.activeElement) {

        //Only allow hex characters
        !(/^[0123456789abcdef]*$/i).test(this.hexInput.nativeElement.value) ? this.hexInput.nativeElement.value = this.hexInput.nativeElement.value.replace(/[^0123456789abcdef]/ig, '') : null;

        //RGB
        let rgb: Color = Color.HexToRGB("#" + this.hexInput.nativeElement.value);
        //HSL
        hsl = rgb.toHSL();
        //HSB
        hsb = rgb.toHSB();


        //If the input field is r,g or b
      } else {

        //Only allow numeric characters
        !(/^[0-9]*$/i).test(this.redInput.nativeElement.value) ? this.redInput.nativeElement.value = this.redInput.nativeElement.value.replace(/[^0-9]/ig, '') : null;
        !(/^[0-9]*$/i).test(this.greenInput.nativeElement.value) ? this.greenInput.nativeElement.value = this.greenInput.nativeElement.value.replace(/[^0-9]/ig, '') : null;
        !(/^[0-9]*$/i).test(this.blueInput.nativeElement.value) ? this.blueInput.nativeElement.value = this.blueInput.nativeElement.value.replace(/[^0-9]/ig, '') : null;

        if (this.redInput.nativeElement.value > 255) this.redInput.nativeElement.value = 255;
        if (this.greenInput.nativeElement.value > 255) this.greenInput.nativeElement.value = 255;
        if (this.blueInput.nativeElement.value > 255) this.blueInput.nativeElement.value = 255;

        //HSL
        hsl = new Color(this.redInput.nativeElement.value, this.greenInput.nativeElement.value, this.blueInput.nativeElement.value, 1).toHSL();
        //HSB
        hsb = new Color(this.redInput.nativeElement.value, this.greenInput.nativeElement.value, this.blueInput.nativeElement.value, 1).toHSB();
      }

      // Move the ring
      this.ringX = hsb.s;
      this.ringY = 100 - hsb.b;

      // Move the hue slider   
      this.hueSliderY = Math.round((249 - ((hsl.h * 360) / 1.422924901185771)));

      // Set the rgb
      this.setRGB()
    }
  }


  // ------------------------------------------------( GET NEW COLOR )----------------------------------------------\\
  getNewColor() {
    let rgb: Color = Color.HexToRGB('#' + this.hex)
    let a = Math.round((((249 - this.alphaSliderY) * 0.3952569169960474) / 100) * 100) / 100;
    return rgb.toRGBString();
  }
}