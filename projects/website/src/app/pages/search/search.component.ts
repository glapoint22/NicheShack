import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { PageData } from '../../classes/page-data';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public pageData: PageData;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get('api/Pages/Search')
      .subscribe((pageData: PageData) => {
        this.pageData = pageData;
      });
  }
}
