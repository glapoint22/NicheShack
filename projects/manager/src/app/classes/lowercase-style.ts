import { CaseStyle } from './case-style';

export class LowercaseStyle extends CaseStyle {
    setCase(text: string): string {
        return text.toLowerCase();
    }
}