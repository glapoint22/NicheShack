import { SafeHtml } from '@angular/platform-browser';
import { Category } from '../interfaces/category';

export interface Suggestion {
    name: string;
    category: Category;
    html?: SafeHtml;
}