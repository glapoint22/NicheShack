import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})

export class ColorPickerComponent {
  public hex: string;
  public hue: number;
  public saturation: number;
  public lightness: number;
  public ringX: number;
  public ringY: number;
  public ringDark: boolean;
  public hueSliderY: number = -4;
  public alphaSliderY: number = -4;
  public currentColor: string;
  @ViewChild('colorContainer', { static: false }) colorContainer: ElementRef;
  @ViewChild('hueContainer', { static: false }) hueContainer: ElementRef;
  @ViewChild('alphaContainer', { static: false }) alphaContainer: ElementRef;
  @ViewChild('redInput', { static: false }) redInput: ElementRef;
  @ViewChild('greenInput', { static: false }) greenInput: ElementRef;
  @ViewChild('blueInput', { static: false }) blueInput: ElementRef;
  @ViewChild('alphaInput', { static: false }) alphaInput: ElementRef;
  @ViewChild('hexInput', { static: false }) hexInput: ElementRef;


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
      var hsl = this.HSBToHSL(this.hue, this.ringX, 100 - this.ringY)
      this.saturation = hsl.s;
      this.lightness = hsl.l;
      this.setRGB();
    }
    setColor(e);
    // Move the ring
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
      this.hue = Math.round((249 - this.hueSliderY) * 1.422924901185771);
      this.setRGB();
    }
    setHue(e)
    // Move the hue slider
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
      this.alphaInput.nativeElement.value = Math.round((((249 - this.alphaSliderY) * 0.3952569169960474) / 100) * 100) / 100;
    }
    setAlpha(e);
    // Move the alpha slider
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
    //RGB
    let rgb = this.HSLToRGB(this.hue / 360, this.saturation / 100, this.lightness / 100);
    //Hex
    let hex = this.RGBToHex(rgb[0], rgb[1], rgb[2]);

    //Update the input fields
    if(this.redInput.nativeElement != document.activeElement) this.redInput.nativeElement.value = rgb[0];
    if(this.greenInput.nativeElement != document.activeElement) this.greenInput.nativeElement.value = rgb[1];
    if(this.blueInput.nativeElement != document.activeElement) this.blueInput.nativeElement.value = rgb[2];
    if(this.hexInput.nativeElement != document.activeElement) this.hexInput.nativeElement.value = hex;

    //Set the ring color
    if (this.ringY < 50) {
      if (this.ringX > 50) {
        if (this.hue > 200 || this.hue < 25) {
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








  onInputChange () {

    //If the input field is alpha
    if(this.alphaInput.nativeElement == document.activeElement) {

      //Only allow numeric characters
      !(/^[0123456789.]*$/i).test(this.alphaInput.nativeElement.value) ? this.alphaInput.nativeElement.value = this.alphaInput.nativeElement.value.replace(/[^0123456789.]/ig, '') : null;

      if (this.alphaInput.nativeElement.value > 1) this.alphaInput.nativeElement.value = 1;


      this.alphaSliderY = 249 - (((this.alphaInput.nativeElement.value * 100) / 0.3952569169960474));



    }else {

      //If the input field is hex
      if(this.hexInput.nativeElement == document.activeElement) {

        //Only allow hex characters
        !(/^[0123456789abcdef]*$/i).test(this.hexInput.nativeElement.value) ? this.hexInput.nativeElement.value = this.hexInput.nativeElement.value.replace(/[^0123456789abcdef]/ig, '') : null;

        //RGB
        var rgb = this.HexToRGB("#" + this.hexInput.nativeElement.value);
        //HSL
        var hsl = this.RGBToHSL(rgb.r, rgb.g, rgb.b);
        //HSB
        var hsb = this.RGBToHSB(rgb.r, rgb.g, rgb.b);

        
      //If the input field is r,g or b
      }else {

        //Only allow numeric characters
        !(/^[0-9]*$/i).test(this.redInput.nativeElement.value) ? this.redInput.nativeElement.value = this.redInput.nativeElement.value.replace(/[^0-9]/ig, '') : null;
        !(/^[0-9]*$/i).test(this.greenInput.nativeElement.value) ? this.greenInput.nativeElement.value = this.greenInput.nativeElement.value.replace(/[^0-9]/ig, '') : null;
        !(/^[0-9]*$/i).test(this.blueInput.nativeElement.value) ? this.blueInput.nativeElement.value = this.blueInput.nativeElement.value.replace(/[^0-9]/ig, '') : null;

        if (this.redInput.nativeElement.value > 255) this.redInput.nativeElement.value = 255;
        if (this.greenInput.nativeElement.value > 255) this.greenInput.nativeElement.value = 255;
        if (this.blueInput.nativeElement.value > 255) this.blueInput.nativeElement.value = 255;

        //HSL
        var hsl = this.RGBToHSL(this.redInput.nativeElement.value, this.greenInput.nativeElement.value, this.blueInput.nativeElement.value);
        //HSB
        var hsb = this.RGBToHSB(this.redInput.nativeElement.value, this.greenInput.nativeElement.value, this.blueInput.nativeElement.value);
      }

      //Update hsl
      this.hue = hsl[0] * 360;
      this.saturation = hsl[1] * 100;
      this.lightness = hsl[2] * 100;

      // Move the ring
      this.ringX = hsb.s;
      this.ringY = 100 - hsb.b;

      // Move the hue slider   
      this.hueSliderY = Math.round((249 - (this.hue / 1.422924901185771)));

      // Set the rgb
      this.setRGB()
    }
  }



  // ----------------------------------------------------( COLOR FUNCTIONS )--------------------------------------------------\\

  HSLToRGB(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }


  RGBToHex(r, g, b) {
    var componentToHex = function (c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
  }


  HexToRGB(h) {
    let r: any = 0, g: any = 0, b: any = 0;
  
    // 1 digit
    if (h.length == 2) {
      r = "0x" + h[1] + 0;
      g = "0x" + 0 + 0;
      b = "0x" + 0 + 0;

    // 2 digits
    } else if (h.length == 3) {
      r = "0x" + h[1] + h[1];
      g = "0x" + 0 + 0;
      b = "0x" + 0 + 0;

    // 3 digits
    } else if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];

    // 4 digits
    } else if (h.length == 5) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + 0    + 0;

    // 5 digits
    } else if (h.length == 6) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + 0;
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    var rgb = {
      r: +r,
      g: +g,
      b: +b
    }
    
    return rgb;
  }


  //HSB to HSL
  HSBToHSL(h, s, b) {
    // determine the lightness in the range [0,100]
    var l = (2 - s / 100) * b / 2;

    // store the HSL components
    var hsl =
    {
      'h': h,
      's': s * b / (l < 50 ? l * 2 : 200 - l * 2),
      'l': l
    };

    // correct a division-by-zero error
    if (isNaN(hsl.s)) hsl.s = 0;
    return hsl;
  }




  //RGB to HSL
  RGBToHSL(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
  }


  //RGB to HSB
  RGBToHSB (red, green, blue) {
    var rr, gg, bb,
        newRed = red / 255,
        newGreen = green / 255,
        newBlue = blue / 255,
        h, s,
        b = Math.max(newRed, newGreen, newBlue),
        diff = b - Math.min(newRed, newGreen, newBlue),
        diffc = function (c) {
            return (b - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / b;
        rr = diffc(newRed);
        gg = diffc(newGreen);
        bb = diffc(newBlue);

        if (newRed === b) {
            h = bb - gg;
        } else if (newGreen === b) {
            h = (1 / 3) + rr - bb;
        } else if (newBlue === b) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        b: Math.round(b * 100)
    };
  }
}