import { LinkBase, LinkOption } from 'classes/link-base';
import { LinkData } from 'classes/link-data';

export class Link extends LinkBase {
    getData(): LinkData {
        if (this.selectedOption == LinkOption.None) return null;

        return {
            selectedOption: this.selectedOption,
            url: this.url,
            optionValue: this.optionValue
        }
    }
}