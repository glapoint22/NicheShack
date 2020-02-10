import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'texts',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  private selectedRange;
  constructor(public _FormService: FormService) { }



  onBoldClick() {
    if (this._FormService.text.iframe.nativeElement.contentDocument.getSelection().anchorNode != null) {
      this.selectedRange = this._FormService.text.iframe.nativeElement.contentDocument.getSelection().getRangeAt(0);

      // Adding Style
      if (!this._FormService.text.styleApplied) {

        // If the style is being applied on just one line
        if (this.selectedRange.commonAncestorContainer != this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild) {
          let span = document.createElement("span");
          span.style.fontWeight = 'bold';
          let documentFragment = this.selectedRange.extractContents();


          span.appendChild(documentFragment)
          this.selectedRange.insertNode(span)


          // If the style is being applied on multiple lines
        } else {


          let start = this.getParentNode(this.selectedRange.startContainer)
          let range = document.createRange()
          range.setStart(this.selectedRange.startContainer, this.selectedRange.startOffset)
          range.setEndAfter(start.lastChild);
          let span = document.createElement("span");
          span.style.fontWeight = 'bold';
          let documentFragment = range.extractContents();
          span.appendChild(documentFragment)
          range.insertNode(span)



          let end = this.getParentNode(this.selectedRange.endContainer);
          range = document.createRange()
          range.setStart(end, 0)
          range.setEnd(this.selectedRange.endContainer, this.selectedRange.endOffset);
          span = document.createElement("span");
          span.style.fontWeight = 'bold';
          documentFragment = range.extractContents();
          span.appendChild(documentFragment)
          range.insertNode(span)




          for (let i = 0; i < this.selectedRange.commonAncestorContainer.children.length; i++) {
            if (this.selectedRange.intersectsNode(this.selectedRange.commonAncestorContainer.children[i]) && start != this.selectedRange.commonAncestorContainer.children[i] && end != this.selectedRange.commonAncestorContainer.children[i]) {
              range = document.createRange()
              range.setStart(this.selectedRange.commonAncestorContainer.children[i], 0)
              range.setEndAfter(this.selectedRange.commonAncestorContainer.children[i].lastChild);
              span = document.createElement("span");
              span.style.fontWeight = 'bold';
              documentFragment = range.extractContents();
              span.appendChild(documentFragment)
              range.insertNode(span)
            }
          }
        }






        // Removing Style
      } else {


        // If the style is being applied on just one line
        if (this.selectedRange.commonAncestorContainer != this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild) {

          this.removeStyle(this.selectedRange);


          // If the style is being applied on multiple lines
        } else {


          let start = this.getParentNode(this.selectedRange.startContainer);
          let startRange = document.createRange();
          startRange.setStart(this.selectedRange.startContainer, this.selectedRange.startOffset);
          let lastChild = this.getLastTextChild(start.lastChild);
          startRange.setEnd(lastChild, lastChild.length);
          this.removeStyle(startRange);




          let end = this.getParentNode(this.selectedRange.endContainer);
          let endRange = document.createRange()
          endRange.setStart(this.getFirstTextChild(end), 0)
          endRange.setEnd(this.selectedRange.endContainer, this.selectedRange.endOffset);
          this.removeStyle(endRange)




          for (let i = 0; i < this.selectedRange.commonAncestorContainer.children.length; i++) {
            if (this.selectedRange.intersectsNode(this.selectedRange.commonAncestorContainer.children[i]) && start != this.selectedRange.commonAncestorContainer.children[i] && end != this.selectedRange.commonAncestorContainer.children[i]) {


              let range = document.createRange()
              range.setStart(this.getFirstTextChild(this.selectedRange.commonAncestorContainer.children[i]), 0)

              let lastChild = this.getLastTextChild(this.selectedRange.commonAncestorContainer.children[i].lastChild)

              range.setEnd(lastChild, lastChild.length);
              this.removeStyle(range)

            }
          }

          this.selectedRange.setStart(startRange.startContainer, startRange.startOffset);
          this.selectedRange.setEnd(endRange.endContainer, endRange.endOffset);
        }




      }
    }
  }


  removeStyle(range: Range) {
    let startRange: Range = document.createRange();
    startRange.setStart(this.getStyleParent(range.startContainer).parentElement, 0);
    startRange.setEnd(range.startContainer, range.startOffset);


    let endRange: Range = document.createRange();
    endRange.setStart(range.endContainer, range.endOffset);
    endRange.setEndAfter(this.getStyleParent(range.endContainer).parentElement);


    startRange.insertNode(startRange.extractContents());
    endRange.insertNode(endRange.extractContents());


    // Update the selected range to include all parent nodes that contain the styles of the selection, but not the parent that contains the style we are removing
    range.setStartBefore(this.getStyleParent(range.startContainer));


    // Extract the contents from the selected range
    let selectedContents = range.extractContents();

    // The count of selected contents is used to update the selected range
    let selectedContentsCount = selectedContents.childNodes.length;

    // Extract the contents from the selected range and place it before the End Range
    endRange.insertNode(selectedContents);

    // Remove any residual elements
    this.cleanUp(this.getParentNode(range.startContainer));

    // Update the selection
    range.setStart(this.getFirstTextChild(endRange.startContainer.childNodes[endRange.startOffset]), 0);
    let child = this.getLastTextChild(endRange.startContainer.childNodes[endRange.startOffset + selectedContentsCount - 1]);
    range.setEnd(child, child.length);
  }



  cleanUp(node) {
    let removed: boolean;

    for (let i = 0; i < node.children.length; i++) {

      if (node.children[i].getBoundingClientRect().width == 0) {
        node.children[i].remove();
        i--;
        removed = true;
      }

      if (!removed) this.cleanUp(node.children[i]);
      removed = false;
    }
  }


  getParentNode(node) {
    while (node.parentElement != this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild) {
      node = node.parentElement;
    }

    return node;
  }



  getStyleParent(node) {
    while (node.parentElement.style.fontWeight != 'bold') {
      node = node.parentElement;
    }
    return node;
  }

  getFirstTextChild(node) {
    let child = node;

    for (let i = 0; i < node.childNodes.length; i++) {
      if (child.nodeType == 3) return child;
      child = this.getFirstTextChild(node.childNodes[i]);
    }


    return child;
  }

  getLastTextChild(node) {
    let child = node;

    for (let i = 0; i < node.childNodes.length; i++) {
      child = this.getLastTextChild(node.childNodes[i])
    }

    return child;
  }













































  // selection() {
  //   var startLoop: boolean = false;
  //   var endLoop: boolean = false;

  //   let getStyle = (node) => {

  //     for (var i = 0; i < node.childNodes.length; i++) {

  //       // if (node.childNodes[i].nodeType == 3) {
  //       // Start Loop
  //       if (node.childNodes[i] == this.range.startContainer) startLoop = true;

  //       // Loop
  //       if (startLoop && !endLoop) {

  //         console.log(node.childNodes[i])

  //       }

  //       // End Loop
  //       if (node.childNodes[i] == this.range.endContainer) endLoop = true;
  //       // }
  //       getStyle(node.childNodes[i])
  //     }
  //   }
  //   getStyle(this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild)
  // }




  // addStyle() {
  //   var startLoop = false;
  //   var endLoop = false;
  //   var range = this._FormService.text.iframe.nativeElement.contentDocument.getSelection().getRangeAt(0);

  //   let getStyle = (node) => {
  //     for (var i = 0; i < node.childNodes.length; i++) {

  //       if (node.childNodes[i].nodeType == 3) {
  //         // Start Loop
  //         if (node.childNodes[i] == range.startContainer) startLoop = true;

  //         // Loop
  //         if (startLoop && !endLoop) {

  //           if (range.startContainer == range.endContainer) {

  //             node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, range.startOffset) + "lllOlll" + node.childNodes[i].nodeValue.substring(range.startOffset, range.endOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(range.endOffset, node.childNodes[i].nodeValue.length);

  //           } else {

  //             if (node.childNodes[i] == range.startContainer) {

  //               node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, range.startOffset) + "lllOlll" + node.childNodes[i].nodeValue.substring(range.startOffset, node.childNodes[i].nodeValue.length) + "lllXlll";

  //             } else if (node.childNodes[i] == range.endContainer) {

  //               node.childNodes[i].nodeValue = "lllOlll" + node.childNodes[i].nodeValue.substring(0, range.endOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(range.endOffset, node.childNodes[i].nodeValue.length);


  //             } else {

  //               node.childNodes[i].nodeValue = "lllOlll" + node.childNodes[i].nodeValue.substring(0) + node.childNodes[i].nodeValue.substring(node.childNodes[i].nodeValue.length) + "lllXlll";
  //             }
  //           }
  //         }

  //         // End Loop
  //         if (node.childNodes[i] == range.endContainer) endLoop = true;
  //       }

  //       getStyle(node.childNodes[i])
  //     }
  //   }
  //   getStyle(this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild)

  //   var replaceStart = this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.replace(/lllOlll/g, this.openingTag);
  //   var replaceEnd = replaceStart.replace(/lllXlll/g, this.closingTag);
  //   this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML = replaceEnd;
  // }





  // // -----------------------------( WHOLE NODE SELECTED )------------------------------ \\
  // wholeNodeSelected(node, i) {
  //   var index = 0;
  //   var styles = [];

  //   // Loop through all the styles of the parent node
  //   for (var j = 0; j < node.childNodes[i].parentElement.style.length; j++) {

  //     // As long as the style is NOT the current style
  //     if (node.childNodes[i].parentElement.style[j] != "font-weight") {

  //       // Make a copy of each style and its value
  //       styles[index] = { style: node.childNodes[i].parentElement.style[j], value: node.childNodes[i].parentElement.style[node.childNodes[i].parentElement.style[j]] };
  //       index++;
  //     }
  //   }
  //   // Then remove all styles
  //   node.childNodes[i].parentElement.removeAttribute("style");

  //   // Put the styles that were copied and their values (if any) back into the node  
  //   for (var j = 0; j < styles.length; j++) {
  //     node.childNodes[i].parentElement.style[styles[j].style] = styles[j].value;
  //   }
  // }



  // // -----------------------------( BEGINING OF NODE SELECTED )------------------------------ \\
  // beginingOfNodeSelected(node, i) {
  //   // Only current style
  //   if (node.childNodes[i].parentElement.style.length == 1 && node.childNodes[i].parentElement.style[0] == "font-weight") {

  //     // 
  //     node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.endOffset) + "lllQlll" + node.childNodes[i].nodeValue.substring(this.endOffset, node.childNodes[i].nodeValue.length);
  //     // Remove the current style
  //     node.childNodes[i].parentElement.removeAttribute("style");

  //     // More than just current style
  //   } else {

  //     this.wholeNodeSelected(node, i);
  //     node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.endOffset) + "lllQlll" + node.childNodes[i].nodeValue.substring(this.endOffset, node.childNodes[i].nodeValue.length) + "lllXlll";
  //   }
  // }



  // // -----------------------------( MIDDLE OF NODE SELECTED )------------------------------ \\
  // middleOfNodeSelected(node, i) {
  //   // Only current style
  //   if (node.childNodes[i].parentElement.style.length == 1 && node.childNodes[i].parentElement.style[0] == "font-weight") {
  //     node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.startOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(this.startOffset, this.endOffset) + "lllQlll" + node.childNodes[i].nodeValue.substring(this.endOffset, node.childNodes[i].nodeValue.length);

  //     // More than just current style
  //   } else {
  //     node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.startOffset) + "lllOlll" + node.childNodes[i].nodeValue.substring(this.startOffset, this.endOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(this.endOffset, node.childNodes[i].nodeValue.length);
  //   }
  // }



  // // -----------------------------( END OF NODE SELECTED )------------------------------ \\
  // endOfNodeSelected(node, i) {
  //   // Only current style
  //   if (node.childNodes[i].parentElement.style.length == 1 && node.childNodes[i].parentElement.style[0] == "font-weight") {
  //     node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.startOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(this.startOffset, node.childNodes[i].nodeValue.length);

  //     // More than just current style
  //   } else {
  //     node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.startOffset) + "lllOlll" + node.childNodes[i].nodeValue.substring(this.startOffset, this.endOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(this.endOffset, node.childNodes[i].nodeValue.length);
  //   }
  // }





  // removeStyle() {
  //   var startLoop: boolean = false;
  //   var endLoop: boolean = false;
  //   var innerHTML: string;

  //   let getStyle = (node) => {
  //     for (var i = 0; i < node.childNodes.length; i++) {

  //       if (node.childNodes[i].nodeType == 3) {
  //         // Start Loop
  //         if (node.childNodes[i] == this.range.startContainer) startLoop = true;

  //         // Loop
  //         if (startLoop && !endLoop) {

  //           // If the start container and the end container are the same
  //           if (this.range.startContainer == this.range.endContainer) {
  //             // Whole
  //             if (this.startOffset == 0 && this.endOffset == this.endContainerLength) this.wholeNodeSelected(node, i);
  //             // Begining
  //             if (this.startOffset == 0 && this.endOffset < this.endContainerLength) this.beginingOfNodeSelected(node, i);
  //             // Middle
  //             if (this.startOffset > 0 && this.endOffset < this.endContainerLength) this.middleOfNodeSelected(node, i);
  //             // End
  //             if (this.startOffset > 0 && this.endOffset == this.endContainerLength) this.endOfNodeSelected(node, i);


  //             // If the selection stretches across multiple nodes
  //           } else {


  //             // Start Container
  //             if (node.childNodes[i] == this.range.startContainer) {
  //               // Whole
  //               if (this.startOffset == 0 && this.endOffset == this.endContainerLength) this.wholeNodeSelected(node, i);
  //               // End
  //               if (this.startOffset > 0 && this.endOffset == this.endContainerLength) this.endOfNodeSelected(node, i);


  //               // End Container
  //             } else if (node.childNodes[i] == this.range.endContainer) {
  //               // Whole
  //               if (this.startOffset == 0 && this.endOffset == this.endContainerLength) this.wholeNodeSelected(node, i);
  //               // Begining
  //               if (this.startOffset == 0 && this.endOffset < this.endContainerLength) this.beginingOfNodeSelected(node, i);


  //               // All nodes in between
  //             } else {
  //               // Whole
  //               if (this.startOffset == 0 && this.endOffset == this.endContainerLength) this.wholeNodeSelected(node, i);
  //             }
  //           }
  //         }

  //         // End Loop
  //         if (node.childNodes[i] == this.range.endContainer) endLoop = true;
  //       }
  //       getStyle(node.childNodes[i])
  //     }
  //   }
  //   getStyle(this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild)

  //   console.log(this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML)

  //   innerHTML = this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.replace(/lllOlll/g, '<span style="font-weight: normal">');
  //   innerHTML = innerHTML.replace(/lllXlll/g, this.closingTag);
  //   innerHTML = innerHTML.replace(/lllQlll/g, this.openingTag);
  //   innerHTML = innerHTML.replace("<span>", "");
  //   this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML = innerHTML;

  //   console.log("")
  //   console.log("--------------------------------------------------------")
  //   console.log("")
  //   console.log(this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML)
  // }



  // setStyle(node) {
  //   for (var i = 0; i < node.childNodes.length; i++) {

  //     if (node.childNodes[i].nodeType == 3) {

  //       // Start Loop
  //       if (node.childNodes[i] == this.range.startContainer) this.startLoop = true;


  //       // Loop
  //       if (this.startLoop && !this.endLoop) {

  //         if (this.range.startContainer == this.range.endContainer) {

  //           node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.range.startOffset) + "lllOlll" + node.childNodes[i].nodeValue.substring(this.range.startOffset, this.range.endOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(this.range.endOffset, node.childNodes[i].nodeValue.length);

  //         } else {

  //           if (node.childNodes[i] == this.range.startContainer) {

  //             node.childNodes[i].nodeValue = node.childNodes[i].nodeValue.substring(0, this.range.startOffset) + "lllOlll" + node.childNodes[i].nodeValue.substring(this.range.startOffset, node.childNodes[i].nodeValue.length) + "lllXlll";

  //           } else if (node.childNodes[i] == this.range.endContainer) {

  //             node.childNodes[i].nodeValue = "lllOlll" + node.childNodes[i].nodeValue.substring(0, this.range.endOffset) + "lllXlll" + node.childNodes[i].nodeValue.substring(this.range.endOffset, node.childNodes[i].nodeValue.length);


  //           } else {

  //             node.childNodes[i].nodeValue = "lllOlll" + node.childNodes[i].nodeValue.substring(0) + node.childNodes[i].nodeValue.substring(node.childNodes[i].nodeValue.length) + "lllXlll";
  //           }
  //         }
  //       }

  //       // End Loop
  //       if (node.childNodes[i] == this.range.endContainer) this.endLoop = true;
  //     }
  //     this.setStyle(node.childNodes[i])
  //   }
  // }


}







































































// private htmlStrip: string;
//   private isOpeningTag: boolean;
//   private tag1: string;
//   private tag2: string;
//   private htmlStripSegments = [];
//   private newHtmlStrip: string = "";
//   private htmlStripStartIndex;
//   private htmlStripEndIndex;
//   private innerHTMLSplice
//   private closingTagIndex;
//   private tagStartIndex
//   private innerHTML;
//   private openingTagIndex
//   private tagEndIndex
//   private htmlStripWithFirstTagRemoved;
//   private nextTagIndex;
// func1() {
//   // Now that the begining and end markers of the html strip have been placed, get the index of those markers within the innerHTML
//   this.htmlStripStartIndex = this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.indexOf("OlllO");
//   this.htmlStripEndIndex = this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.indexOf("XlllX");

//   // Make a copy of the innerHTML
//   this.innerHTML = this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML;


//   // If the start offset is at the begining of the start container
//   if (this.startOffset == 0) {

//     // Then we have to remove the opening tag that lies before the start container. To do this, splice a section of the innerHTML from the begining 
//     // of the innerHTML up until where the html strip begins
//     this.innerHTMLSplice = this.innerHTML.substring(0, this.htmlStripStartIndex);

//     // Then do a search for that opening tag by starting the search at the end the splice (the splice we just created) and searching backwards
//     this.openingTagIndex = this.innerHTMLSplice.lastIndexOf(this.openingTag);

//     // Once we have the position of that opeining tag, we can omit the opening tag by creating two substrings around it, and then updating the innerHTML
//     this.innerHTML = this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.substring(0, this.openingTagIndex)
//       + this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.substring(this.openingTagIndex + this.openingTag.length, this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML.length);

//     // Because we modified the innerHTML, the start and end index values of the html strip are no longer accurate, so we have to update those index values
//     this.htmlStripStartIndex = this.innerHTML.indexOf("OlllO");
//     this.htmlStripEndIndex = this.innerHTML.indexOf("XlllX");
//   }


//   // If the end offset is at the end of the end container
//   if (this.endOffset == this.endContainerLength) {

//     // Then we have to remove the closing tag that lies at the end of the end container. To do this, splice a section of the innerHTML from the end 
//     // of the html strip to the end of the innerHTML
//     this.innerHTMLSplice = this.innerHTML.substring(this.htmlStripEndIndex, this.innerHTML.length);

//     // Then do a search for that closing tag by starting the search at the begining the splice (the splice we just created) and searching for the next closing tag
//     this.closingTagIndex = this.innerHTMLSplice.indexOf(this.closingTag);

//     // Once we have the position of that closing tag, we can omit the closing tag by creating two substrings around it, and then updating the innerHTML
//     this.innerHTMLSplice = this.innerHTMLSplice.substring(0, this.closingTagIndex)
//       + this.innerHTMLSplice.substring(this.closingTagIndex + this.closingTag.length, this.innerHTMLSplice.length);

//     // Once we have the position of that opeining tag, we can omit the opening tag by creating two substrings around it, and then updating the innerHTML
//     this.innerHTML = this.innerHTML.substring(0, this.htmlStripEndIndex) + this.innerHTMLSplice

//     // Because we modified the innerHTML, the start and end index values of the html strip are no longer accurate, so we have to update those index values
//     this.htmlStripStartIndex = this.innerHTML.indexOf("OlllO");
//     this.htmlStripEndIndex = this.innerHTML.indexOf("XlllX");
//   }
// }



// func2() {

// // If opening and/or closing tags have been placed, replace them with the real tags
// if (this.endOffset < this.endContainerLength) this.innerHTML = this.innerHTML.replace("lllOlll", this.openingTag);
// if (this.startOffset > 0) this.innerHTML = this.innerHTML.replace("lllXlll", this.closingTag);

// // Remove the start and end container markers
// this.innerHTML = this.innerHTML.replace("OlllO", "");
// this.innerHTML = this.innerHTML.replace("XlllX", "");


// // Update the real innerHTML
// this._FormService.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild.innerHTML = this.innerHTML;

// }


// removeStyleOld() {
//   this.startOffset = this.range.startOffset;
//   this.endOffset = this.range.endOffset;
//   this.endContainerLength = this.range.endContainer.nodeValue.length;

//   // If the start container is the same as the end container
//   if(this.range.startContainer == this.range.endContainer) {

//     // If the start offset is NOT at the begining of the start container
//     if (this.range.startOffset > 0 && this.range.endOffset == this.range.endContainer.nodeValue.length) {
//       // Then that means a html closing tag needs to be placed at the position of that start offset so that the style can be terminated
//       this.range.startContainer.nodeValue = this.range.startContainer.nodeValue.substring(0, this.range.startOffset) + "lllXlll" + this.range.startContainer.nodeValue.substring(this.range.startOffset, this.range.startContainer.length)
//     }


//     // If the start offset is NOT at the begining of the start container
//     if (this.range.startOffset > 0 && this.range.endOffset < this.range.endContainer.nodeValue.length) {
//       this.range.startContainer.nodeValue = this.range.startContainer.nodeValue.substring(0, this.range.startOffset) + "lllXlll"
//                                           + this.range.startContainer.nodeValue.substring(this.range.startOffset, this.range.endOffset) + "lllOlll"
//                                           + this.range.startContainer.nodeValue.substring(this.range.endOffset, this.range.endContainer.length)
//     }



//     // If the end offset is NOT at the end of the end container
//     if (this.range.endOffset < this.range.endContainer.nodeValue.length && this.startOffset == 0) {
//       this.range.endContainer.nodeValue = this.range.endContainer.nodeValue.substring(0, this.range.endOffset) + "lllOlll" + this.range.endContainer.nodeValue.substring(this.range.endOffset, this.range.endContainer.length)
//     }


//     // Then place a marker at the begining of the start container to mark the begining of the html strip
//     this.range.startContainer.nodeValue = "OlllO" + this.range.startContainer.nodeValue;
//     // Place a marker at the end of the end container to mark the end of the html strip
//     this.range.endContainer.nodeValue += "XlllX";




//     this.func1();



//     this.func2();




//   }else {



//     // If the start offset is NOT at the begining of the start container
//     if (this.range.startOffset > 0) {
//       // Then that means a html closing tag needs to be placed at the position of that start offset so that the style can be terminated
//       this.range.startContainer.nodeValue = this.range.startContainer.nodeValue.substring(0, this.range.startOffset) + "lllXlll" + this.range.startContainer.nodeValue.substring(this.range.startOffset, this.range.startContainer.length)
//     }


//     // If the end offset is NOT at the end of the end container
//     if (this.range.endOffset < this.range.endContainer.nodeValue.length) {
//       // Then that means a html opening tag needs to be placed at the position of that end offset so that the style can continue
//       this.range.endContainer.nodeValue = this.range.endContainer.nodeValue.substring(0, this.range.endOffset) + "lllOlll" + this.range.endContainer.nodeValue.substring(this.range.endOffset, this.range.endContainer.length)
//     }


//     // Place a marker at the end of the start container to mark the begining of the html strip
//     this.range.startContainer.nodeValue += "OlllO";
//     // Then place a marker at the begining of the end container to mark the end of the html strip
//     this.range.endContainer.nodeValue = "XlllX" + this.range.endContainer.nodeValue;


//     this.func1();


//     // Create the html strip
//     this.htmlStrip = this.innerHTML.substring(this.htmlStripStartIndex, this.htmlStripEndIndex);


//     // Loop through the html strip until all style tags that need to be removed are gone
//     while (this.nextTagIndex != -1) {
//       this.tag1 = this.isOpeningTag ? this.openingTag : this.closingTag;
//       this.tag2 = this.isOpeningTag ? this.closingTag : this.openingTag;
//       this.isOpeningTag = !this.isOpeningTag;

//       // Get the index of where the first tag resides within the html strip
//       this.tagStartIndex = this.htmlStrip.indexOf(this.tag1);
//       // Then get the index of where that tag ends
//       this.tagEndIndex = this.tagStartIndex + this.tag1.length;
//       // Copy the html strip but with the first tag we were looking for removed from the string
//       this.htmlStripWithFirstTagRemoved = this.htmlStrip.substring(0, this.tagStartIndex) + this.htmlStrip.substr(this.tagEndIndex);
//       // Now that the first tag has been found and removed, get the index of where the next tag resides
//       this.nextTagIndex = this.htmlStripWithFirstTagRemoved.indexOf(this.tag2);

//       // As long as all the style tags from the html strip that we want to remove haven't been removed yet
//       if (this.nextTagIndex != -1) {
//         // Make individual segments of the html strip by creating a substring of the this.htmlStripWithFirstTagRemoved string from the begining of the string up until the next tag
//         this.htmlStripSegments.push(this.htmlStripWithFirstTagRemoved.substr(0, this.nextTagIndex));
//       }

//       // Update the html strip by removing the segment that was just created from the string
//       this.htmlStrip = this.htmlStripWithFirstTagRemoved.substr(this.nextTagIndex);
//     }

//     // Loop through all the html strip segments
//     for (var i = 0; i < this.htmlStripSegments.length; i++) {
//       // Put all the segments together in the order that they were created to make a new html strip
//       this.newHtmlStrip += this.htmlStripSegments[i]
//     }

//     // Now piece the new html strip back into the innerHTML
//     this.innerHTML = this.innerHTML.substring(0, this.htmlStripStartIndex) + this.newHtmlStrip + this.innerHTML.substr(this.htmlStripEndIndex);

//     this.func2();
//   }
// }





