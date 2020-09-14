import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../../services/contact-us.service';

@Component({
  selector: 'navfooter',
  templateUrl: './navfooter.component.html',
  styleUrls: ['./navfooter.component.scss']
})
export class NavfooterComponent implements OnInit {

  constructor(private contactUsService: ContactUsService) { }

  ngOnInit() {
  }

  onContactUsLinkClick() {
    this.contactUsService.show = true;
  }
}