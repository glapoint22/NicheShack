import { Color } from './color';
import { CaptionData } from './caption-data';

export class CaptionBase {
    public defaultColor: Color = new Color(200, 200, 200, 1);
    public text: string;
    public fontWeight: string = 'normal';
    public fontStyle: string = 'normal';
    public textDecoration: string = 'none';
    public color: Color = this.defaultColor;


    setData(captionData: CaptionData) {
        if (captionData) {
            if (captionData.text) this.text = captionData.text;

            // Styles
            if (captionData.fontWeight) this.fontWeight = captionData.fontWeight;
            if (captionData.fontStyle) this.fontStyle = captionData.fontStyle;
            if (captionData.textDecoration) this.textDecoration = captionData.textDecoration;

            // Color
            if (captionData.color) this.color = Color.hexToRGB(captionData.color);
        }
    }
}