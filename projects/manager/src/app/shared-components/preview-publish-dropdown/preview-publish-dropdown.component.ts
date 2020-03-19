import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'preview-publish-dropdown',
  templateUrl: './preview-publish-dropdown.component.html',
  styleUrls: ['./preview-publish-dropdown.component.scss']
})
export class PreviewPublishDropdownComponent {
  constructor(public menuService: MenuService) { }
  @ViewChild('container', { static: false }) container: ElementRef;


  // -----------------------------( SHOW PREVIEW PUBLISH MENU )------------------------------ \\
  showPreviewPublishMenu() {
    // Build the menu
    this.menuService.buildMenu(this, this.container.nativeElement.getBoundingClientRect().right - 264, this.container.nativeElement.getBoundingClientRect().top + 22,
      // Preview
      this.menuService.option("Preview", "Ctrl+Alt+P", false, this.preview),
      // Publish
      this.menuService.option("Publish", "Ctrl+Shift+Alt+P", false, this.publish));
  }


  // -----------------------------( PREVIEW )------------------------------ \\
  preview() {
    // Preview
  }


  // -----------------------------( PUBLISH )------------------------------ \\
  publish() {
    // Publish
  }
}