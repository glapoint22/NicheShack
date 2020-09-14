import { CaptionBase } from 'classes/caption-base';
import { CaptionData } from 'classes/caption-data';

export class Caption extends CaptionBase {
    font: string = 'Arial, Helvetica, sans-serif';
    fontSize: string = '14px';

    setData(captionData: CaptionData) {
        super.setData(captionData);

        // If we have font family data
        if (captionData.font) {
            this.font = captionData.font;
        }


        // If we have text size data
        if (captionData.fontSize) {
            // Assign the style
            this.fontSize = captionData.fontSize + 'px';
        }
    }


    getStyle() {
        return '\n\tfont-family: ' + this.font + ';' +
            '\n\tfont-size: ' + this.fontSize + ';' +
            super.getStyle();
    }
}