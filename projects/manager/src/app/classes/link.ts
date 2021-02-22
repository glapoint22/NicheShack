import { LinkBase, LinkOption } from 'classes/link-base';
import { LinkData } from 'classes/link-data';

export class Link extends LinkBase {
    getData(): LinkData {
        if (this.selectedOption == LinkOption.None) return null;

        return {
            id: this.id,
            selectedOption: this.selectedOption,
            url: this.selectedOption != LinkOption.Page && this.selectedOption != LinkOption.Product ? this.url : null,
            optionValue: this.selectedOption != LinkOption.Page && this.selectedOption != LinkOption.Product ? this.optionValue : null
        }
    }
}