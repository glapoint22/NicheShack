import { ImageData } from './image-data';

export interface BackgroundImageData extends ImageData {
    position: string;
    repeat: string;
    attachment: string;
}