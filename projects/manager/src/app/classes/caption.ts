import { Color } from './color';
import { CaptionData } from './caption-data';
import { Font } from './font';
import { FontSize } from './font-size';

export class Caption {
    public font: Font = new Font(null, null);
    public fontSize: FontSize = new FontSize(null, null);
    public text: string;
    public fontWeight: string = 'normal';
    public fontStyle: string = 'normal';
    public textDecoration: string = 'none';

    constructor(public color: Color = new Color(200, 200, 200, 1)) {
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


    load(captionData: CaptionData) {
        if (captionData) {
            if (captionData.text) this.text = captionData.text;

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

            // Styles
            if (captionData.fontWeight) this.fontWeight = captionData.fontWeight;
            if (captionData.fontStyle) this.fontStyle = captionData.fontStyle;
            if (captionData.textDecoration) this.textDecoration = captionData.textDecoration;

            // Color
            if (captionData.color) this.color = Color.hexToRGB(captionData.color);
        }
    }




    save(captionData: CaptionData) {
        // Font
        if (this.font.styleValue != this.font.options[0].value) captionData.font = this.font.styleValue;

        // Font Size
        if (this.fontSize.styleValue != this.fontSize.options[7].value) {
            let index = this.fontSize.options.findIndex(x => x.value == this.fontSize.styleValue);
            captionData.fontSize = this.fontSize.options[index].key;
        }


        // Text
        if (this.text) captionData.text = this.text;

        // Font Weight
        if (this.fontWeight != 'normal') captionData.fontWeight = this.fontWeight;

        // Font Style
        if (this.fontStyle != 'normal') captionData.fontStyle = this.fontStyle;

        // Text Decoration
        if (this.textDecoration != 'none') captionData.textDecoration = this.textDecoration;

        // Color
        if (!this.color.isEqual(new Color(200, 200, 200, 1))) captionData.color = this.color.toHex();
    }
}