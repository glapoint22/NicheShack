import { Component, Input } from '@angular/core';
import { HierarchyItem } from 'projects/manager/src/app/classes/hierarchy-item';
import { HierarchyComponent } from '../hierarchy.component';


@Component({
  selector: 'hierarchy-content',
  templateUrl: './hierarchy-content.component.html',
  styleUrls: ['./hierarchy-content.component.scss']
})
export class HierarchyContentComponent {
  @Input() items: Array<HierarchyItem>;
  @Input() hierarchy: HierarchyComponent


  // -----------------------------( SHOW HIDE CHILDREN )------------------------------ \\
  showHideChildren(parent: HierarchyItem, input: HTMLInputElement) {

    if (!parent.children || parent.children.length == 0) {
      // Prevent the arrow button from rotating while loading its children
      window.setTimeout(() => {
        input.checked = false;
      });

      // Get this item's children
      this.hierarchy.loadChildren(parent).subscribe();
    } else {
      window.setTimeout(() => {
        // show or hide children
        parent.showChildren = input.checked;

        // hide item's grand children
        if (!input.checked) {
          parent.children.forEach((item: HierarchyItem) => {
            item.showChildren = false;
          });
        }
      });
    }
  }

  




  // -----------------------------( TRANSITION END )------------------------------ \\
  transitionend(event: any) {
    // Don't hide the item if class list contains show-child
    if (event.path[1].classList.contains('show-child')) {
      event.path[1].style = "";
    } else {
      // Hide the item
      event.path[1].style = "visibility: hidden";
    }
  }
}