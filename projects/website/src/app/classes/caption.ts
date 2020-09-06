import { CaptionBase } from 'classes/caption-base';
import { CaptionData } from 'classes/caption-data';

export class Caption extends CaptionBase {
    font: string;
    fontSize: string;

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
}