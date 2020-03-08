import { HSL } from './hsl';
import { HSB } from './hsb';

export class Color {
    public static zero: Color = new Color(0, 0, 0, 0);

    constructor(public r?: number, public g?: number, public b?: number, public a?: number) { }

    copy(color: Color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }

    isEqual(color: Color): boolean {
        return this.r == color.r &&
            this.g == color.g &&
            this.b == color.b &&
            this.a == color.a
    }

    toRGBAString(): string {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    }


    toRGBString(): string {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b  + ')';
    }


    static HSLToRGB(h, s, l): Color {
        let r: number;
        let g: number;
        let b: number;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }
        return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1);
    }

    static RGBToHex(color: Color): string {
        return this.componentToHex(color.r) + this.componentToHex(color.g) + this.componentToHex(color.b);
    }


    static HexToRGB(h): Color {
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
            b = "0x" + 0 + 0;

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
        return new Color(+r, +g, +b, 1);
    }


    static HSBToHSL(h, s, b) {
        // determine the lightness in the range [0,100]
        let l = (2 - s / 100) * b / 2;
        let hsl = new HSL(h, s * b / (l < 50 ? l * 2 : 200 - l * 2), l);

        // correct a division-by-zero error
        if (isNaN(hsl.s)) hsl.s = 0;
        return hsl;
    }


    static RGBToHSL(color: Color) {
        let r = color.r;
        let g = color.g;
        let b = color.b;

        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return new HSL(h, s, l);
    }



    static RGBToHSB(color: Color) {
        let rr: number, gg: number, bb: number;
        let newRed: number = color.r / 255;
        let newGreen: number = color.g / 255;
        let newBlue: number = color.b / 255;
        let h: number, s: number;
        let b: number = Math.max(newRed, newGreen, newBlue);
        let diff: number = b - Math.min(newRed, newGreen, newBlue);


        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / b;
            rr = this.diffc(newRed, b, diff);
            gg = this.diffc(newGreen, b, diff);
            bb = this.diffc(newBlue, b, diff);

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
        return new HSB(Math.round(h * 360), Math.round(s * 100), Math.round(b * 100));
    }



    static RGBAToHexA(color: Color): string {
        let r: string = color.r.toString(16);
        let g: string = color.g.toString(16);
        let b: string = color.b.toString(16);
        let a: string = Math.round(color.a * 255).toString(16);
      
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
        if (a.length == 1)
          a = "0" + a;
      
        return "#" + r + g + b + a;
      }



    private static diffc(c, b, diff) {
        return (b - c) / 6 / diff + 1 / 2;
    };

    private static componentToHex(component: number): string {
        let hex = component.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }


    private static hue2rgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
}