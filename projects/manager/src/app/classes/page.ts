import { Background } from './background';

export class Page {
    public id: string;
    public name: string;
    public width: number;
    public background: Background = new Background();
    public type?: number;
}