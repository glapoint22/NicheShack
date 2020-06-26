import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent {
  @Input() hierarchyItem: HierarchyItem;
  @Output() onModeChange: EventEmitter<string> = new EventEmitter();
  public mode: string;

  ngOnChanges() {
    this.mode = 'properties';
    window.setTimeout(() => {
      this.onModeChange.emit(this.mode);
    });
  }
}