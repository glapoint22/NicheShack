import { Color } from './color';
import { ButtonTextData } from './button-text-data';
import { Font } from './font';
import { FontSize } from './font-size';

export class ButtonText {
    public font: Font = new Font();
    public fontSize: FontSize = new FontSize();
    public caption: string = 'Button';
    public fontWeight: string = 'normal';
    public fontStyle: string = 'normal';
    public textDecoration: string = 'none';

    constructor(public color: Color = new Color(200, 200, 200, 1)) {
        this.font.selectedIndex = 0;
        this.font.styleValue = this.font.options[this.font.selectedIndex].value;

        this.fontSize.selectedIndex = 7;
        this.fontSize.styleValue = this.fontSize.options[this.fontSize.selectedIndex].value;
    }

    getStyle() {
        return '\n\tfont-family: ' + this.font.styleValue + ';' +
            '\n\tfont-size: ' + this.fontSize.styleValue + ';' +
            '\n\tfont-weight: ' + this.fontWeight + ';' +
            '\n\tfont-style: ' + this.fontStyle + ';' +
            '\n\ttext-decoration: ' + this.textDecoration + ';' +
            '\n\tcolor: ' + this.color.toRGBString() + ';';
    }


    load(buttonTextData: ButtonTextData) {
        if (buttonTextData) {
            if (buttonTextData.caption) this.caption = buttonTextData.caption;

            // If we have font family data
            if (buttonTextData.font) {
                this.font.styleValue = buttonTextData.font;
                this.font.applyStyle();
            }

            // If we have text size data
            if (buttonTextData.fontSize) {
                // Assign the style
                this.fontSize.styleValue = buttonTextData.fontSize;

                // Get the index of the font size from the options list
                let index = this.fontSize.options.findIndex(x => x.value == this.fontSize.styleValue);

                // The font size was not found in the list so we need to update it with a custom size
                if (index == -1) {
                    // Set the custom font size as the first option
                    this.fontSize.options[0].key = buttonTextData.fontSize;
                    this.fontSize.options[0].value = this.fontSize.styleValue;

                    // select the custom size
                    this.fontSize.selectedIndex = 0;
                } else {
                    // Set the selected index as this font size
                    this.fontSize.selectedIndex = index;
                }
            }

            // Styles
            if (buttonTextData.fontWeight) this.fontWeight = buttonTextData.fontWeight;
            if (buttonTextData.fontStyle) this.fontStyle = buttonTextData.fontStyle;
            if (buttonTextData.textDecoration) this.textDecoration = buttonTextData.textDecoration;

            // Color
            if (buttonTextData.color) this.color = Color.hexToRGB(buttonTextData.color);
        }
    }




    save(buttonTextData: ButtonTextData) {
        // Font
        if (this.font.styleValue != this.font.options[0].value) buttonTextData.font = this.font.styleValue;

        // Font Size
        if (this.fontSize.styleValue != this.fontSize.options[7].value) buttonTextData.fontSize = this.fontSize.styleValue;

        // caption
        if (this.caption != 'Button') buttonTextData.caption = this.caption;

        // Font Weight
        if (this.fontWeight != 'normal') buttonTextData.fontWeight = this.fontWeight;

        // Font Style
        if (this.fontStyle != 'normal') buttonTextData.fontStyle = this.fontStyle;

        // Text Decoration
        if (this.textDecoration != 'none') buttonTextData.textDecoration = this.textDecoration;

        // Color
        if (!this.color.isEqual(new Color(200, 200, 200, 1))) buttonTextData.color = this.color.toHex();
    }
}