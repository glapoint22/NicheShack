import { BackgroundBase } from 'classes/background-base';
import { BackgroundImageBase } from 'classes/background-image-base';
import { BackgroundData } from 'classes/background-data';

export class Background extends BackgroundBase {
    public image: BackgroundImageBase = new BackgroundImageBase();

    setData(backgroundData: BackgroundData) {
        if (backgroundData) {
            super.setData(backgroundData);

            // Background image
            if (backgroundData.image) this.image.setData(backgroundData.image);
        }
    }
}