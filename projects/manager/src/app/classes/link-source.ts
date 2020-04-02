import { Link } from './link';

export interface LinkSource {
    link: Link;
    applyLink?();
}