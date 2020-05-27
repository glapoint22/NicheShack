import { Background } from './background';
import { PageData } from './page-data';

export class Page extends PageData {
    background: Background = new Background();
}