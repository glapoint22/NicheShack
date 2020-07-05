import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Notification } from '../../classes/notification';
import { PopupService } from '../../services/popup.service';
import { NotificationService } from '../../services/notification.service';
import { menuBarMenu } from '../../classes/menu-bar-menu';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  public selectedMenuBarMenu: menuBarMenu;
  public menuBarMenus: Array<menuBarMenu> = [{

    name: 'File', showMenuFunction: (menu: HTMLElement) => {
      this.menuService.buildMenu(this, menu.getBoundingClientRect().left, menu.getBoundingClientRect().top + menu.getBoundingClientRect().height,
        this.menuService.routerOption("Niche Shack Editor", null, false, "/"),
        this.menuService.routerOption("Page Builder", null, false, "/page-builder"),
        this.menuService.routerOption("Email Builder", null, false, "/email-builder"),
        this.menuService.divider(),
        this.menuService.routerOption("Change Name", null, false, "/change-name"),
        this.menuService.routerOption("Change Email", null, false, "/change-email"),
        this.menuService.routerOption("Change Password", null, false, "/change-password"),
        this.menuService.divider(),
        this.menuService.option("Vendor Form", null, false, () => this.formService.vendorForm.show = true),
        this.menuService.option("Filters Form", null, false, () => this.formService.filtersForm.show = true),
        this.menuService.divider(),
        this.menuService.option("Sign Out", null, false, () => { })
      )
    }
  },
  {
    name: 'Edit', showMenuFunction: (menu: HTMLElement) => {
      this.menuService.buildMenu(this, menu.getBoundingClientRect().left, menu.getBoundingClientRect().top + menu.getBoundingClientRect().height,
        this.menuService.option("Undo", "Ctrl+Z", false, () => { }),
        this.menuService.option("Redo", "Ctrl+Y", false, () => { }),
        this.menuService.divider(),
        this.menuService.option("Cut", "Ctrl+X", false, () => { }),
        this.menuService.option("Copy", "Ctrl+C", false, () => { }),
        this.menuService.option("Paste", "Ctrl+V", false, () => { }),
      );
    }
  },
  {
    name: 'View', showMenuFunction: (menu: HTMLElement) => {
      this.menuService.buildMenu(this, menu.getBoundingClientRect().left, menu.getBoundingClientRect().top + menu.getBoundingClientRect().height,
        this.menuService.option("Full Screen", "F11", false, () => { })
      );
    }
  }];


  constructor(
    private menuService: MenuService,
    private popupService: PopupService,
    public notificationService: NotificationService,
    private formService: FormService
  ) { }


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.notificationService.getNotifications().subscribe((notification: Notification) => {
      this.notificationService.newNotifications.unshift(notification);
    })

    // When the dropdown menu closes
    this.menuService.onMenuHide.subscribe(() => {
      // Deselect the selected menu bar menu
      this.selectedMenuBarMenu = null;
    })
  }


  // -----------------------------( SHOW NOTIFICATIONS POPUP )------------------------------ \\
  showNotificationsPopup(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.notificationListPopup.show = !this.popupService.notificationListPopup.show;
  }
}