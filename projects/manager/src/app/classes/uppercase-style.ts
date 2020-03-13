import { CaseStyle } from './case-style';

export class UppercaseStyle extends CaseStyle {
    setCase(text: string): string {
        return text.toUpperCase();
    }
}