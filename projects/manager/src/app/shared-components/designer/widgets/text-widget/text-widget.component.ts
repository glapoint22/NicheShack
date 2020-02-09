import { Component, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends WidgetComponent {
  constructor(widgetService: WidgetService, public _FormService: FormService) { super(widgetService)}

  // iframe
  @ViewChild('iframe', { static: false }) iframe: ElementRef;


  // --------------------------Text--------------------------- \\
  public text = {
    iframe: null,
    div: document.createElement("div"),
    styleApplied: false
  };

  // --------------------------Margins--------------------------- \\
  public margins: any = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    this.text.iframe = this.iframe
    this.text.div.style.width = "100%";
    this.text.div.style.height = "100%";
    this.text.div.contentEditable = "true";
    this.text.div.style.outline = "none";
    this.text.div.innerHTML =


    // `
    // <div>blah blah blah and fucking blah blah blah, so we're going to test to see if a selection works in the middle of an underline and outside an underline</div>
    
    // <div>This is the second line, we are going to test this line with styles as well</div>

    // <div>this is the third line and we are testing this third line as well</div>
    
    // `



    `
    <div>This is the first <span style='font-weight: bold'> line with <span style='color: red'>no <span style='text-decoration: underline'> styles applied to <span style='font-style: italic'> it, we are </span></span></span></span>going to apply some bold and see what happens</div>
    <div>This is the second line and this line also has no styles to it, and we want to test to see what happens with this line</div>
    <div>And then finally, this is the third line, the last line of this test, which also has no styles applied to it</div>
    
    
    
    `



    // `
    // <div>This is the first line of tests!</div>
    // <div>

    //   Hello, this <span style='color: red'>is a </span><i>simple <u>line</u></i><u> of te</u>xt! He<span style='font-size: 24px'>re <span style='color: green'>we are</span> add<span style='color: blue'>ing anot<U>her sentence </U></span></span><span style='color: blue'><U>so we </U>can</span><span style='color: red'> add more sytles to this line.</span>
    
    // </div>
    
    // <div>Now this is the second line <span style='color: blue'>of text so <u>we can <i>test to</i> see if</u> the <span style='font-size: 24px'>selection</span></span><span style='font-size: 24px'> style thing that we </span>are doing works with two lines.</div>
    
    // `


    //   `<div>This <span style='font-style: italic'><span style='text-decoration: underline'>is</span></span> the <span style='font-style: italic'>fi<span style='font-weight: bold'>rst <span style="color: blue">line</span></span></span><span style='font-weight: bold'><span style="color: blue"> and we are <span style="font-size: 24px;">going to apply</span></span><span style="font-size: 24px;"> all sorts <span style="color: green">of crazy</span> 	little wonderful</span> and awesome <span style='text-decoration: underline'>styles to it <span style="color: red">so we can</span></span></span><span style="color: red"><span style='font-weight: bold'> make some tes</span>ts</span> with it.</div>
    //  <div>Now, this is the second line, <span style='font-weight: bold; font-style: italic'>and we are going to test to see how</span></span> the selection works with this second line.</div>
    //  <div>And then finally, this is the third line, and we are going to test how the selection works between all three lines.</div>
    //  `;



    //  `<div><span style="color: rgb(147, 101, 184);"><s>A<span style="background-color: rgb(209, 72, 65);">f</span></s>
    // </span><span style="background-color: rgb(209, 72, 65);"><em><s><span style="color: rgb(147, 101, 184);">t<strong>er thr</strong></span></s><u><span style="color: rgb(147, 101, 184);"><strong><s>ee m</s>ar</strong><span style="font-family: Impact,Charcoal,sans-serif;">atho</span></span><span style="font-family: Impact,Charcoal,sans-serif;">n da</span></u></em>
    // </span><span style="font-family: Impact,Charcoal,sans-serif;"><u><span style="font-size: 24px; background-color: rgb(209, 72, 65);">ys of&nbsp;</span></u><span style="font-size: 24px;"><span style="background-color: rgb(209, 72, 65);">impe</span>ac<em>hm<u>ent t<s>e</s></u></em></span><s><em><u>stimo</u></em></s></span>
    // <span
    //     style="color: rgb(97, 189, 109);"><s><em><u>ny from<strong>&nbsp;De</strong></u></em><u><strong><em>mo</em></strong></u><em><strong>cratic</strong><strong>&nbsp;Hou</strong></em></s></span><em><strong><span style="color: rgb(97, 189, 109); font-size: 18px;">se m<span style="font-family: Times New Roman,Times,serif,-webkit-standard;">a<span style="background-color: rgb(250, 197, 28);">nage</span>r<span style="background-color: rgb(147, 101, 184);">s</span></span></span><span style="background-color: rgb(147, 101, 184);"><span style="font-family: Times New Roman,Times,serif,-webkit-standard;"><span style="font-size: 18px;">&nbsp;o</span></span></span></strong></em>
    //     <span
    //         style="background-color: rgb(147, 101, 184);"><span style="font-family: Times New Roman,Times,serif,-webkit-standard;"><span style="font-size: 18px;"><em>n w</em><span style="color: rgb(184, 49, 47);">hy Pr</span></span><span style="color: rgb(184, 49, 47);"><u>es</u></span></span><u><span style="color: rgb(184, 49, 47);">ide<strong><s>nt Don</s>ald Tru</strong>m</span></u></span><u><span style="font-size: 30px;;background-color: rgb(147, 101, 184);">p sho</span></u>
    //         <span
    //             style="font-size: 30px;;background-color: rgb(147, 101, 184);">ul<span style="color: rgb(44, 130, 201);">d b<s>e c</s></span></span><span style="font-size: 30px;"><span style="color: rgb(44, 130, 201);"><s>o<span style="font-family: Impact,Charcoal,sans-serif;">nv<span style="background-color: rgb(97, 189, 109);">ict</span></span>
    //             <span
    //                 style="background-color: rgb(97, 189, 109);">e<u>d a<em>n</em></u></span>
    //                 </s><em><span style="background-color: rgb(97, 189, 109);"><u>d re</u></span></em></span><em><u><span style="background-color: rgb(97, 189, 109);">m</span>ov</u></em></span><em><u>e<span style="color: rgb(226, 80, 65);">d fr<strong><span style="font-family: Georgia,serif;">om&nbsp;</span></strong></span></u></em><strong><span style="font-family: Georgia,serif;"><span style="color: rgb(226, 80, 65);"><em>off<s>ice, T<span style="background-color: rgb(84, 172, 210);">ru</span></s></em><span style="background-color: rgb(84, 172, 210);"><s>m</s></span></span><span style="background-color: rgb(84, 172, 210);"><s>p&#39;s leg</s></span></span><span style="background-color: rgb(84, 172, 210);"><s><span style="font-family: Georgia,serif;">al</span> te<em>a</em></s></span></strong><em><span style="background-color: rgb(84, 172, 210);"><s>m w</s></span><span style="background-color: rgb(251, 160, 38);"><s>ill<u> ha</u></s><u>v<span style="color: rgb(184, 49, 47);">e eq</span></u></span><span style="color: rgb(184, 49, 47);"><span style="background-color: rgb(251, 160, 38);">ual tim<strong>e</strong></span><strong><span style="font-size: 18px;;background-color: rgb(251, 160, 38);"> to&nbsp;</span><span style="font-size: 18px;">m</span><span style="font-size: 36px;">a</span></strong></span></em>
    //                 <span
    //                     style="font-size: 36px;"><strong>k</strong><span style="font-family: Verdana,Geneva,sans-serif;">e <em>it<u>s ca</u></em></span></span><span style="font-family: Verdana,Geneva,sans-serif;"><u><span style="font-size: 36px;"><em>s<span style="color: rgb(85, 57, 130);">e t<span style="background-color: rgb(84, 172, 210);">o se<s>na</s></span></span>
    //                     </em>
    //                     </span><span style="background-color: rgb(84, 172, 210);"><s><span style="color: rgb(85, 57, 130);"><span style="font-size: 36px;">t</span>ors </span>star</s>
    //                     </span>
    //                     </u>
    //                     </span><s><span style="font-family: Verdana,Geneva,sans-serif;"><span style="background-color: rgb(84, 172, 210);"><strong>ting&nbsp;</strong></span><strong>Sa</strong></span><strong>t</strong></s><strong>urd</strong>ay.</div>

    // `;





    this.text.iframe.nativeElement.srcdoc = this.text.div.outerHTML;

    

    window.setTimeout(() => {
      this.text.iframe.nativeElement.contentDocument.addEventListener('mouseup', () => { this.onSelection() })
    });
  }


  // -----------------------------( ON SELECTION )------------------------------ \\
  onSelection() {
    if (this.text.iframe.nativeElement.contentDocument.getSelection().anchorNode != null) {
      var startLoop = false;
      var endLoop = false;
      var range = this.text.iframe.nativeElement.contentDocument.getSelection().getRangeAt(0);

      let getStyle = (node) => {
        for (var i = 0; i < node.childNodes.length; i++) {

          if (node.childNodes[i].nodeType == 3 && !node.childNodes[i].nodeValue.match(/^\s+$/)) {

            
            // Start Loop
            if (node.childNodes[i] == range.startContainer) startLoop = true;

            // Loop
            if (startLoop && !endLoop) {


              if (window.getComputedStyle(node.childNodes[i].parentElement).fontWeight == "400") {
                this.text.styleApplied = false;
                break;
              } else {
                this.text.styleApplied = true;
              }


            }

            // End Loop
            if (node.childNodes[i] == range.endContainer) endLoop = true;
          }

          getStyle(node.childNodes[i])
        }
      }
      getStyle(this.text.iframe.nativeElement.contentDocument.firstChild.children[1].firstChild)
      this.app.tick();
    }
  }

  // -----------------------------( ON EDIT )------------------------------ \\
  onEdit() {
    this._FormService.text = this.text;
    this._FormService.margins = this.margins;

    // Open the text form
    this._FormService.showTextForm = true;
  }
}