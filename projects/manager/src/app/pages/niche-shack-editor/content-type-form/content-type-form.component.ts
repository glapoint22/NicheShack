import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'content-type-form',
  templateUrl: './content-type-form.component.html',
  styleUrls: ['./content-type-form.component.scss']
})
export class ContentTypeFormComponent {
  private contentType: string;
  @ViewChild('list', { static: false }) list: ElementRef;
  constructor(public _FormService: FormService) {}

  // -------------------------------------( ON FORM OPEN )-----------------------------------\\
  onFormOpen() {
    
    window.setTimeout(() => {

      for(let i = 0; i < this.list.nativeElement.options.length; i++) {
        if(this.list.nativeElement.options[i].value == this._FormService.contentType.product.items[this._FormService.contentType.index].type) {
          this.list.nativeElement.selectedIndex = i;
          this.list.nativeElement.focus();
          this.contentType = this.list.nativeElement.options[i].value;
        }
      }

      
      
    });

  }

  onOk() {
    this._FormService.showContentTypeForm = false;
    this._FormService.contentType.selected[this._FormService.contentType.index] = false;
    this._FormService.contentType.product.items[this._FormService.contentType.index].type = this.contentType;
  }

  onCancel() {
    this._FormService.showContentTypeForm = false;
    this._FormService.contentType.selected[this._FormService.contentType.index] = false;
  }

  onSelect(e) {

    this.contentType = e.target.value;
  }

}
