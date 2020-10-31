import { SafeHtml } from '@angular/platform-browser';
import { SuggestedCategory } from './suggested-category';

export interface Suggestion {
    name: string;
    category: SuggestedCategory;
    html?: SafeHtml;
}