import { TextBox } from './text-box';
import { LowercaseStyle } from './lowercase-style';
import { ApplicationRef } from '@angular/core';
import { Color } from './color';
import { UppercaseStyle } from './uppercase-style';

export class Description extends TextBox {
    public lowercaseStyle: LowercaseStyle;
    public uppercaseStyle: UppercaseStyle;

    constructor(text: string, contentDocument: HTMLDocument, applicationRef: ApplicationRef, defaultFontColor: Color) {
        super(text, contentDocument, applicationRef, defaultFontColor);

        this.lowercaseStyle = new LowercaseStyle(contentDocument);
        this.uppercaseStyle = new UppercaseStyle(contentDocument);
    }
}

