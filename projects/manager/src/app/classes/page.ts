import { Background } from './background';

export class Page {
    id: string;
    name: string;
    width: number;
    background: Background = new Background();
}