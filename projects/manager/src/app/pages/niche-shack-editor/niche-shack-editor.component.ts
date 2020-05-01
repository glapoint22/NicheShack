import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HierarchyItem } from '../../classes/hierarchy-item';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'niche-shack-editor',
  templateUrl: './niche-shack-editor.component.html',
  styleUrls: ['./niche-shack-editor.component.scss']
})
export class NicheShackEditorComponent implements OnInit {
  public showProductForm: boolean;
  public showNicheForm: boolean;
  public item: HierarchyItem;
  @ViewChild('button1', { static: false }) button1: ElementRef;
  @ViewChild('button2', { static: false }) button2: ElementRef;
  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

  showForm(item: HierarchyItem) {
    if (item.type == 'Product') {
      this.showProductForm = true;
      this.showNicheForm = false;
    } else {
      this.showNicheForm = true;
      this.showProductForm = false;
    }

    this.item = item;
  }

  menu1() {
    // Build the context menu
    this.menuService.buildMenu(this, this.button1.nativeElement.getBoundingClientRect().left, this.button1.nativeElement.getBoundingClientRect().top + this.button1.nativeElement.getBoundingClientRect().height + 1,
      this.menuService.option("Option 1A", "Ctrl+Shift+1A", false, this.alita),
      this.menuService.option("Option 1B", "Ctrl+Shift+1B", false, this.alita),
      this.menuService.option("Option 1C", "Ctrl+Shift+1C", false, this.alita));
  }

  menu2() {
    // Build the context menu
    this.menuService.buildMenu(this, this.button2.nativeElement.getBoundingClientRect().left, this.button2.nativeElement.getBoundingClientRect().top + this.button2.nativeElement.getBoundingClientRect().height + 1,
    this.menuService.option("Option 2A", "Ctrl+Shift+2A", false, this.alita),
    this.menuService.option("Option 2B", "Ctrl+Shift+2B", false, this.alita),
    this.menuService.option("Option 2C", "Ctrl+Shift+2C", false, this.alita));
  }

  rightClickMenu(e: MouseEvent) {
    if (e.which == 3) {

      // Build Menu
      this.menuService.buildMenu(this, e.clientX + 5, e.clientY + 3, 
          this.menuService.option("Alita", "Ctrl+A", false, this.alita),
          this.menuService.divider(),
          this.menuService.subMenu("Sub Menu 1", false,
              this.menuService.option("Option 1A", "Ctrl+Shift+1A", false, this.alita),
              this.menuService.option("Option 1B", "Ctrl+Shift+1B", false, this.alita),
              this.menuService.divider(),
              this.menuService.subMenu("Sub Menu 2", false,
                  this.menuService.option("Option 2A", "Ctrl+Shift+2A", false, this.alita),
                  this.menuService.option("Option 2B", "Ctrl+Shift+2B", false, this.alita),
                  this.menuService.divider(),
                  this.menuService.option("Option 2C", "Ctrl+Shift+2C", false, this.alita)),
              this.menuService.option("Option 1C", "Ctrl+Shift+1C", false, this.alita),
              this.menuService.option("Option 1D", "Ctrl+Shift+1D", false, this.alita),
                  this.menuService.divider(),
              this.menuService.subMenu("Sub Menu 3", false, 
                  this.menuService.option("Option 3A", "Ctrl+Shift+3A", false, this.alita),
                  this.menuService.option("Option 3B", "Ctrl+Shift+3B", false, this.alita),
                  this.menuService.divider(),
                  this.menuService.subMenu("Sub Menu 4", false, 
                      this.menuService.option("Option 4A", "Ctrl+Shift+4A", false, this.alita),
                      this.menuService.option("Option 4B", "Ctrl+Shift+4B", false, this.alita),
                      this.menuService.option("Option 4C", "Ctrl+Shift+4C", false, this.alita)),
                  this.menuService.option("Option 3C", "Ctrl+Shift+3C", false, this.alita)),
              this.menuService.option("Option 1E", "Ctrl+Shift+1E", false, this.alita),
              this.menuService.option("Option 1F", "Ctrl+Shift+1F", false, this.alita)),                         
          this.menuService.option("Battle", "Ctrl+B", false, this.alita),
          this.menuService.option("Angel", "Ctrl+N", false, this.alita));
    }
  }

  alita() {

  }
}