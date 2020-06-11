import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Notification } from '../../classes/notification';
import { PopupService } from '../../services/popup.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  constructor(public menuService: MenuService, public popupService: PopupService, public notificationService: NotificationService) { }
  @ViewChild('navigationDropdown', { static: false }) navigationDropdown: ElementRef;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.getNotifications().subscribe((notification: Notification) => {
      this.notificationService.newNotifications.unshift(notification);
      this.notificationService.newNotifications = this.notificationService.newNotifications.slice();
    })
  }


  // -----------------------------( GET NOTIFICATIONS )------------------------------ \\
  getNotifications(): Observable<Notification> {
    return this.notificationService.tempData() 
  }


  // -----------------------------( SHOW NOTIFICATIONS POPUP )------------------------------ \\
  showNotificationsPopup(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.notificationsPopup.show = !this.popupService.notificationsPopup.show;
  }


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