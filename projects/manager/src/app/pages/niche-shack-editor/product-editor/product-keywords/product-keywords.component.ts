import { Component, OnInit, ViewChildren, ElementRef, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent implements OnInit {
  constructor() { }
  public keywords: any[] = [];
  public selectedKeywordIndex: number = null;
  public editedKeywordIndex: number = null;
  public eventListenersSet: boolean = false;
  public preventMousedown: boolean = false;
  public disableAdd: boolean = false;
  public disableEdit: boolean = true;
  public disableDelete: boolean = true;
  private shiftDown: boolean = false;
  private ctrlDown: boolean = false;
  private newKeyword: boolean = false;
  @ViewChildren('keyword') keyword: QueryList<ElementRef>;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.keywords = [{ name: "Gumpy", selected: false, selectType: null },
    { name: "Ice Cream", selected: false, selectType: null },
    { name: "Chocolate", selected: false, selectType: null },
    { name: "Vanilla", selected: false, selectType: null },
    { name: "Strawberry", selected: false, selectType: null },
    { name: "Sundae", selected: false, selectType: null },
    { name: "Ice Cream Cone", selected: false, selectType: null },
    { name: "Mint Chocolate Chip", selected: false, selectType: null },
    { name: "Flavor of the Day", selected: false, selectType: null }]
  }


  // -----------------------------( ON KEY DOWN )------------------------------ \\
  private onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) this.enter();
    if (event.keyCode === 46) this.delete();
    if (event.keyCode === 27) this.escape();
    if (event.keyCode === 38) this.arrowUp();
    if (event.keyCode === 40) this.arrowDown();
    if (event.shiftKey) this.shiftDown = true;
    if (event.ctrlKey) this.ctrlDown = true;
  };


  // -----------------------------( ON KEY UP )------------------------------ \\
  private onKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === 16) this.shiftDown = false;
    if (event.keyCode === 17) this.ctrlDown = false;
  }


  // -----------------------------( ON MOUSE DOWN )------------------------------ \\
  private onMouseDown = () => {
    if (!this.preventMousedown) {

      if (this.editedKeywordIndex != null) {
        let keyword = this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement;

        if ((/^[^.\s]/).test(keyword.textContent) && keyword.textContent.length > 0) {

          // this.keywords[this.editedKeywordIndex].selected = true;
          // this.keywords[this.editedKeywordIndex].selectType = "whole";


          this.selectedKeywordIndex = this.editedKeywordIndex;
          this.keywords[this.editedKeywordIndex].name = keyword.textContent;
          this.editedKeywordIndex = null;
          this.disableAdd = false;
          this.disableEdit = false;
          this.disableDelete = false;
          this.newKeyword = false;
        }

      } else {

        this.unsetEventListeners();
        this.disableEdit = true;
        this.disableDelete = true;
      }
    }
  };


  // -----------------------------( SET EVENT LISTENERS )------------------------------ \\
  setEventListeners() {
    if (!this.eventListenersSet) {
      this.eventListenersSet = true;
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
      window.addEventListener('mousedown', this.onMouseDown);
    }
  }


  // -----------------------------( UNSET EVENT LISTENERS )------------------------------ \\
  unsetEventListeners() {
    this.removeFocus();
    this.eventListenersSet = false;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousedown', this.onMouseDown);
  }

  
  // -----------------------------( ON KEYWORD DOWN )------------------------------ \\
  onKeywordDown(index: number) {

    // If a keyword is NOT being edited
    if (this.editedKeywordIndex == null) {
      this.setEventListeners();
      this.disableDelete = false;

      this.disableEdit = false;

      this.selectedKeywordIndex = index;


      

      

      // ---Define what keyword is selected--- \\

      // If the shift key is down
      if (this.shiftDown) {
        let firstIndex = this.keywords.map(e => e.selected).indexOf(true);
        let lastIndex = this.keywords.map(e => e.selected).lastIndexOf(true);

        // If no keyword is selected yet
        if (firstIndex == -1) {
          // Set the selected
          this.keywords[index].selected = true;
          // If one or more keywords are already selected
        } else {

          if(this.selectedKeywordIndex < firstIndex)  {

            for(let i = lastIndex; i > firstIndex; i--) {
              this.keywords[i].selected = false;
            }

            for(let i = firstIndex - 1; i >= this.selectedKeywordIndex; i--) {
              this.keywords[i].selected = true;
            }

            

          }else if(this.selectedKeywordIndex > lastIndex) {
          
            for(let i = firstIndex; i < lastIndex; i++) {
              this.keywords[i].selected = false;
            }

            for(let i = lastIndex + 1; i <= this.selectedKeywordIndex; i++) {
              this.keywords[i].selected = true;
            }

            

          }else {

            // Group all the selected together
            for (let i = Math.min(index, firstIndex); i <= Math.max(index, lastIndex); i++) {
              this.keywords[i].selected = true;
            }

          }

          

          
        }

        // If the ctrl key is down 
      } else if (this.ctrlDown) {
        // Toggle selected on and off
        this.keywords[index].selected = !this.keywords[index].selected;


        // If NO modifier key is down
      } else {
        // Clear all the selected
        for (let i = 0; i < this.keywords.length; i++) this.keywords[i].selected = false;
        // Set the selected
        this.keywords[index].selected = true;
      }

      this.disableEdit = false;
      let selectCount: number = 0;
      for (let i = 0; i < this.keywords.length; i++) {
        if(this.keywords[i].selected) selectCount++;
        if(selectCount > 1) {
          this.disableEdit = true;
          break;
        }
      }

      // ---Set the select type---\\

      // If there is only one keyword in the list
      if (this.keywords.length == 1) {
        this.keywords[0].selectType = "whole";

        // If there is more than one keyword
      } else {

        // First keyword
        this.keywords[0].selectType = this.keywords[0].selected ? this.keywords[1].selected ? "top" : "whole" : null;
        // Every keyword in between
        for (let i = 1; i < this.keywords.length - 1; i++) this.keywords[i].selectType = this.keywords[i].selected ? !this.keywords[i - 1].selected && this.keywords[i + 1].selected ? "top" : this.keywords[i - 1].selected && !this.keywords[i + 1].selected ? "bottom" : !this.keywords[i - 1].selected && !this.keywords[i + 1].selected ? "whole" : "middle" : null;
        // Last keyword
        this.keywords[this.keywords.length - 1].selectType = this.keywords[this.keywords.length - 1].selected ? this.keywords[this.keywords.length - 2].selected ? "bottom" : "whole" : null;
      }
      


      // If a keyword is being edited and a keyword that is NOT being edited is selected
    } else if (index != this.editedKeywordIndex) {
      let keyword = this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement;

      // As long as the edited keyword has text and has no spaces in the begining
      if ((/^[^.\s]/).test(keyword.textContent) && keyword.textContent.length > 0) {
        // Undo edit mode
        this.newKeyword = false;
        this.disableAdd = false;
        this.disableEdit = false;
        this.disableDelete = false;
        this.editedKeywordIndex = null;

        this.selectedKeywordIndex = this.editedKeywordIndex;

        // this.keywords[this.editedKeywordIndex].selected = true;
        // this.keywords[this.editedKeywordIndex].selectType = "whole";
        this.keywords[this.editedKeywordIndex].name = keyword.textContent;
      }
    }
  }


  // -----------------------------( ON KEYWORD DOUBLE CLICK )------------------------------ \\
  onKeywordDoubleClick() {

    if (!this.shiftDown && !this.ctrlDown) {

      if (this.editedKeywordIndex == null) {
        this.editKeyword()
      }
    }
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeFocus() {
    this.editedKeywordIndex = null;

    for (let i = 0; i < this.keywords.length; i++) {
      this.keywords[i].selected = false;
      this.keywords[i].selectType = null;
    }
  }





  // -----------------------------( ADD KEYWORD )------------------------------ \\
  addKeyword() {
    if (!this.disableAdd) {
      this.newKeyword = true;
      this.disableAdd = true;
      this.setEventListeners();
      this.keywords.push({ name: "", selected: false, selectType: null });
      this.selectedKeywordIndex = null;

      // for (let i = 0; i < this.keywords.length; i++) {
      //   this.keywords[i].selected = false;
      //   this.keywords[i].selectType = null;
      // }


      this.editedKeywordIndex = this.keywords.length - 1;
      this.disableEdit = true;
      this.disableDelete = true;

      window.setTimeout(() => {
        this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement.focus();
      });
    }
  }


  // -----------------------------( EDIT KEYWORD )------------------------------ \\
  editKeyword() {
    if (!this.disableEdit) {






      this.disableEdit = true;
      this.disableAdd = true;
      this.disableDelete = true;

      this.editedKeywordIndex = this.selectedKeywordIndex;

      // this.editedKeywordIndex = this.keywords.map(e => e.selected).indexOf(true);
      // this.keywords[this.editedKeywordIndex].selected = false;
      // this.keywords[this.editedKeywordIndex].selectType = null;
      this.selectedKeywordIndex = null;

      window.setTimeout(() => {
        let keyword = this.keyword.find((item, index) => index == this.editedKeywordIndex);
        keyword.nativeElement.focus();
        let range = document.createRange();
        range.selectNodeContents(keyword.nativeElement);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    }
  }


  // -----------------------------( ENTER )------------------------------ \\
  enter() {
    event.preventDefault();
    if (this.editedKeywordIndex != null) {
      let keyword = this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement;

      if ((/^[^.\s]/).test(keyword.textContent) && keyword.textContent.length > 0) {


        this.selectedKeywordIndex = this.editedKeywordIndex;


        // this.keywords[this.editedKeywordIndex].selected = true;
        // this.keywords[this.editedKeywordIndex].selectType = "whole";


        this.editedKeywordIndex = null;
        this.disableAdd = false;
        this.disableEdit = false;
        this.disableDelete = false;
        this.newKeyword = false;
      }
    }
  }


  // -----------------------------( DELETE )------------------------------ \\
  delete() {
    if (!this.disableDelete) {
      let index = this.selectedKeywordIndex;
      if(this.selectedKeywordIndex == this.keywords.length - 1) this.selectedKeywordIndex = null;
      this.keywords.splice(index, 1);

      // let deletedKeywordIndex: number;
      // let lastIndex: number = (this.keywords.length - 1) - this.keywords.map(e => e.selected).lastIndexOf(true);





      // do {
      //   deletedKeywordIndex = this.keywords.map(e => e.selected).indexOf(true);
      //   if (deletedKeywordIndex != -1) {
      //     this.keywords.splice(deletedKeywordIndex, 1);
      //   }
      // }
      // while (deletedKeywordIndex != -1);

      // if (this.keywords.length - lastIndex < this.keywords.length) {

      //   this.keywords[this.keywords.length - lastIndex].selected = true;
      //   this.keywords[this.keywords.length - lastIndex].selectType = "whole";
      // }




    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    if (this.editedKeywordIndex != null) {


      if (this.newKeyword) {

        this.keywords.splice(this.editedKeywordIndex, 1);
        this.editedKeywordIndex = null;
        this.disableAdd = false;

      } else {





        this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement.textContent = this.keywords[this.editedKeywordIndex].name;

        this.selectedKeywordIndex = this.editedKeywordIndex;

        // this.keywords[this.editedKeywordIndex].selected = true;
        // this.keywords[this.editedKeywordIndex].selectType = "whole";

        this.editedKeywordIndex = null;
        this.disableAdd = false;
        this.disableEdit = false;
        this.disableDelete = false;








      }




    } else {

      this.unsetEventListeners();
      this.disableEdit = true;
      this.disableDelete = true;
    }
  }


  // -----------------------------( ARROW UP )------------------------------ \\
  arrowUp() {
    if (this.selectedKeywordIndex > 0) this.selectedKeywordIndex--;
  }


  // -----------------------------( ARROW DOWN )------------------------------ \\
  arrowDown() {
    if (this.selectedKeywordIndex < this.keywords.length - 1) this.selectedKeywordIndex++;
  }
}