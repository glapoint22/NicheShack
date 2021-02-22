import { LinkableImageData } from "classes/linkable-image-data";
import { Image } from "./image";
import { Link } from "./link";

export class LinkableImage {
    image: Image = new Image();
    link: Link = new Link();

    constructor(linkableImageData?: LinkableImageData) {
        if (linkableImageData) {
            this.image.setData(linkableImageData.image);
            this.link.setData(linkableImageData.link);
        }
    }

    getData(): LinkableImageData {
        return {
            image: this.image.getData(),
            link: this.link.getData()
        }
    }
}