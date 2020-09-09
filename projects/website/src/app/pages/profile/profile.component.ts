import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'classes/customer';
import { AccountService } from 'services/account.service';
import { EditProfilePictureComponent } from './edit-profile-picture/edit-profile-picture.component';
import { DataService } from 'services/data.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends PageComponent implements OnInit, OnDestroy {
  public accountUpdated: boolean;
  public customer: Customer = new Customer();
  public showEditProfilePictureForm: boolean = false;
  private subscription: Subscription;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private router: Router,
    private accountService: AccountService,
    private dataService: DataService
    ) {
    super(titleService, metaService, document);
  }

  ngOnInit() {
    this.title = 'Profile';
    super.ngOnInit();

    // Flag if account has been updated
    this.accountUpdated = this.accountService.accountUpdated;
    this.accountService.accountUpdated = false;

    // Get customer info
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {

        this.customer = customer;
      });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  OpenFileExplorerWindow(pictureSelectInput: HTMLInputElement) {
    // Clear the picture select input (This is so the same filename can be re-entered again and again)
    pictureSelectInput.value = '';
    // Open the file explorer window
    pictureSelectInput.click();
  }



  onPictureSelect(event: UIEvent & { target: HTMLInputElement & { files: Array<string> } }, pictureSelectInput: EditProfilePictureComponent) {
    let formData = new FormData();
    formData.append('image', event.target.files[0]);

    this.dataService.post('api/Account/CopyProfilePicture', formData, 'text').subscribe((url) => {
      pictureSelectInput.picUrl = url;
      pictureSelectInput.show = true;
    })
  }

  
  openEditProfilePictureForm(pictureSelectInput: EditProfilePictureComponent) {
    pictureSelectInput.picUrl = this.customer.image;
    pictureSelectInput.show = true;
  }
}