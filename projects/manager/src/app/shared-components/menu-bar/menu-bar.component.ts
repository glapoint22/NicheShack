import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  constructor(public menuService: MenuService) { }
  @ViewChild('navigationDropdown', { static: false }) navigationDropdown: ElementRef;

  // -----------------------------( SHOW NAVIGATION MENU )------------------------------ \\
  showNavigationMenu() {
    // Build the menu
    this.menuService.buildMenu(this, this.navigationDropdown.nativeElement.getBoundingClientRect().right - 147, this.navigationDropdown.nativeElement.getBoundingClientRect().top + 28,
      this.menuService.routerOption("Niche Shack Editor", null, false, "/"),
      this.menuService.routerOption("Page Builder", null, false, "/page-builder"),
      this.menuService.divider(),
      this.menuService.routerOption("Change Name", null, false, "/change-name"),
      this.menuService.routerOption("Change Email", null, false, "/change-email"),
      this.menuService.routerOption("Change Password", null, false, "/change-password"),
      this.menuService.divider(),
      this.menuService.option("Sign Out", null, false, this.signOut)
    );
  }


  // -----------------------------( SIGN OUT )------------------------------ \\
  signOut() {

  }
}