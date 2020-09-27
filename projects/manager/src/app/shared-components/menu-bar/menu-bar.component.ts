import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { PopupService } from '../../services/popup.service';
import { NotificationService } from '../../services/notification.service';
import { menuBarMenu } from '../../classes/menu-bar-menu';
import { FormService } from '../../services/form.service';
import { RouterOption } from '../../classes/router-option';
import { MenuDivider } from '../../classes/menu-divider';
import { MenuOption } from '../../classes/menu-option';
import { DataService } from 'services/data.service';
import { NotificationListItem } from '../../classes/notification-list-item';
import { QueryService } from '../../services/query.service';
import { Category } from '../../classes/category';

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
        [
          new RouterOption("Niche Shack Editor", false, "/"),
          new RouterOption("Page Builder", false, "/page-builder"),
          new RouterOption("Email Builder", false, "/email-builder"),
          new MenuDivider(),
          new RouterOption("Change Name", false, "/change-name"),
          new RouterOption("Change Email", false, "/change-email"),
          new RouterOption("Change Password", false, "/change-password"),
          new MenuDivider(),
          new MenuOption("Vendor Form", false, () => this.formService.vendorForm.show = true),
          new MenuOption("Filters Form", false, () => this.formService.filtersForm.show = true),
          new MenuDivider(),
          new MenuOption("Sign Out", false, () => { })
        ]
      );
    }
  },
  {
    name: 'Edit', showMenuFunction: (menu: HTMLElement) => {
      this.menuService.buildMenu(this, menu.getBoundingClientRect().left, menu.getBoundingClientRect().top + menu.getBoundingClientRect().height,
        [
          new MenuOption("Undo", false, () => { }, null, "Ctrl+Z"),
          new MenuOption("Redo", false, () => { }, null, "Ctrl+Y"),
          new MenuDivider(),
          new MenuOption("Cut", false, () => { }, null, "Ctrl+X"),
          new MenuOption("Copy", false, () => { }, null, "Ctrl+C"),
          new MenuOption("Paste", false, () => { }, null, "Ctrl+V")
        ]
      );
    }
  },
  {
    name: 'View', showMenuFunction: (menu: HTMLElement) => {
      this.menuService.buildMenu(this, menu.getBoundingClientRect().left, menu.getBoundingClientRect().top + menu.getBoundingClientRect().height,
        [
          new MenuOption("Full Screen", false, () => { }, null, "F11")
        ]
      );
    }
  }];


  constructor(
    private menuService: MenuService,
    private popupService: PopupService,
    public notificationService: NotificationService,
    private formService: FormService,
    private dataService: DataService,
    private queryService: QueryService
  ) { }


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.dataService.get('api/Notifications/Load')
      .subscribe(((notifications: Array<NotificationListItem>) => {
        this.notificationService.newNotifications = notifications.filter(x => x.state == 0);
        this.notificationService.pendingNotifications = notifications.filter(x => x.state == 1);
      }));


    // When the dropdown menu closes
    this.menuService.menu.onHide.subscribe(() => {
      // Deselect the selected menu bar menu
      this.selectedMenuBarMenu = null;
    })


    // Get a list of all the categories for Query Builder
    this.dataService.get('api/Categories')
      .subscribe((categories: Array<Category>) => {

        this.queryService.categoryList = categories.map(x => ({
          id: x.id,
          name: x.name,
          icon: null
        }));

      });


      // this.dataService.get('api/Niches/All')
      // .subscribe((niches) => {
      //   console.log(niches)
      // });


      this.dataService.get('api/Products/Alita')
      .subscribe((niches) => {
        // console.log(niches)
      });
  }


  // -----------------------------( SHOW NOTIFICATIONS POPUP )------------------------------ \\
  showNotificationsPopup(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.notificationListPopup.show = !this.popupService.notificationListPopup.show;
  }
}