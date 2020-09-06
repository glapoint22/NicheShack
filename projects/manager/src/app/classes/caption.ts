import { CaptionData } from '../../../../../classes/caption-data';
import { Font } from './font';
import { FontSize } from './font-size';
import { CaptionBase } from 'classes/caption-base';

export class Caption extends CaptionBase {
    public font: Font = new Font(null, null);
    public fontSize: FontSize = new FontSize(null, null);

    constructor() {
        super();

        this.font.selectedIndex = 0;
        this.font.styleValue = this.font.options[this.font.selectedIndex].value;

        this.fontSize.selectedIndex = 7;
        this.fontSize.styleValue = this.fontSize.options[this.fontSize.selectedIndex].value;
    }


    applyStyle(element: HTMLElement) {
        element.style.fontFamily = this.font.styleValue;
        element.style.fontSize = this.fontSize.styleValue;
        element.style.fontWeight = this.fontWeight;
        element.style.fontStyle = this.fontStyle;
        element.style.textDecoration = this.textDecoration;
        element.style.color = this.color.toRGBString();
    }

    getStyle() {
        return '\n\tfont-family: ' + this.font.styleValue + ';' +
            '\n\tfont-size: ' + this.fontSize.styleValue + ';' +
            '\n\tfont-weight: ' + this.fontWeight + ';' +
            '\n\tfont-style: ' + this.fontStyle + ';' +
            '\n\ttext-decoration: ' + this.textDecoration + ';' +
            '\n\tcolor: ' + this.color.toRGBString() + ';';
    }


    setData(captionData: CaptionData) {
        if (captionData) {
            super.setData(captionData);

            // If we have font family data
            if (captionData.font) {
                this.font.styleValue = captionData.font;
                this.font.applyStyle();
            }

            // If we have text size data
            if (captionData.fontSize) {
                // Assign the style
                this.fontSize.styleValue = captionData.fontSize + 'px';

                // Get the index of the font size from the options list
                let index = this.fontSize.options.findIndex(x => x.value == this.fontSize.styleValue);

                // The font size was not found in the list so we need to update it with a custom size
                if (index == -1) {
                    // Set the custom font size as the first option
                    this.fontSize.options[0].key = captionData.fontSize;
                    this.fontSize.options[0].value = this.fontSize.styleValue;

                    // select the custom size
                    this.fontSize.selectedIndex = 0;
                } else {
                    // Set the selected index as this font size
                    this.fontSize.selectedIndex = index;
                }
            }
        }
    }




    getData(): CaptionData {
        return {
            font: this.font.styleValue != this.font.options[0].value ? this.font.styleValue : null,
            fontSize: this.getFontSize(),
            text: this.text,
            fontWeight: this.fontWeight != 'normal' ? this.fontWeight : null,
            fontStyle: this.fontStyle != 'normal' ? this.fontStyle : null,
            textDecoration: this.textDecoration != 'none' ? this.textDecoration : null,
            color: !this.color.isEqual(this.defaultColor) ? this.color.toHex() : null
        }
    }

    getFontSize() {
        if (this.fontSize.styleValue != this.fontSize.options[7].value) {
            let index = this.fontSize.options.findIndex(x => x.value == this.fontSize.styleValue);
            return this.fontSize.options[index].key;
        }

        return null;
    }
}