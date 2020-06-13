import { DropdownStyle } from './dropdown-style';
import { Subject } from 'rxjs';

export class FontSize extends DropdownStyle {

    constructor(contentDocument: HTMLDocument, onChange: Subject<void>) {
        contentDocument = contentDocument != null ? contentDocument : document.implementation.createHTMLDocument();

        super(contentDocument, onChange);

        this.options = [
            {
                key: 'Other',
                value: ''
            },
            {
                key: '6',
                value: '6px'
            },
            {
                key: '8',
                value: '8px'
            },
            {
                key: '9',
                value: '9px'
            },
            {
                key: '10',
                value: '10px'
            },
            {
                key: '11',
                value: '11px'
            },
            {
                key: '12',
                value: '12px'
            },
            {
                key: '14',
                value: '14px'
            },
            {
                key: '18',
                value: '18px'
            },
            {
                key: '24',
                value: '24px'
            },
            {
                key: '30',
                value: '30px'
            },
            {
                key: '36',
                value: '36px'
            },
            {
                key: '48',
                value: '48px'
            },
            {
                key: '60',
                value: '60px'
            },
            {
                key: '72',
                value: '72px'
            },
        ]

        this.style = 'fontSize';
    }
}