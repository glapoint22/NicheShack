import { LinkOption } from './link-base';

export interface LinkData {
    id: number;
    selectedOption: LinkOption;
    url: string;
    optionValue: string;
}