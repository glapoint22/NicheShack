import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { PageData } from '../../classes/page-data';

@Component({
  selector: 'browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public pageData: PageData;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get('api/Pages/Browse')
      .subscribe((pageData: PageData) => {
        this.pageData = pageData;
      });
  }

}
