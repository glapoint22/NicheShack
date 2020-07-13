import { Style } from './style';
import { Subject } from 'rxjs';

export abstract class CaseStyle extends Style {

    constructor(contentDocument: HTMLDocument, onChange: Subject<string>) {
        super(contentDocument, onChange);
    }

    setStyle(range: Range) {
        let startOffset: number = range.startOffset;
        let endOffset: number = range.endOffset;

        this.parseContents(this.contentParentNode, range);

        // Update the selection if we are at the start of the range
        if (range.startContainer == this.selectedRange.startContainer) {
            this.selectedRange.setStart(range.startContainer, startOffset)
        }


        // Update the selection if we are at the end of the range
        if (range.endContainer == this.selectedRange.endContainer) {
            this.selectedRange.setEnd(range.endContainer, endOffset);
        }
    }

    parseContents(node: Node, range: Range) {
        for (let i = 0; i < node.childNodes.length; i++) {
            let currentNode: ChildNode = node.childNodes[i];

            // Test to see if the current node is in the selected range
            if (range.intersectsNode(currentNode)) {

                // If the current node is a text node
                if (currentNode.nodeType == 3) {
                    let text: Text = currentNode as Text;
                    let offset = 0;
                    let count = text.length;

                    // Start container is the same as the end container
                    if (range.startContainer == range.endContainer) {
                        offset = range.startOffset;
                        count = range.endOffset - range.startOffset;
                    } else {
                        // Text node is the start container
                        if (text == range.startContainer) {
                            offset = range.startOffset;
                            count = text.length - offset;

                            // Text node is the end container
                        } else if (text == range.endContainer) {
                            count = range.endOffset;
                        }
                    }

                    // Set the case for this text
                    text.replaceData(offset, count, this.setCase(text.substringData(offset, count)));
                } else {
                    this.parseContents(currentNode, range);
                }

                // If the current node is beyond the selected range, return
            } else if (range.comparePoint(currentNode, 0) == 1) {
                return;
            }
        }
    }


    abstract setCase(text: string): string;
}