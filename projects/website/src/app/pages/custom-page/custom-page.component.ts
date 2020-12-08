import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'services/data.service';
import { PageData } from '../../classes/page-data';

@Component({
  selector: 'custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {
  public pageData: PageData;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get('api/Pages', [{ key: 'id', value: this.route.snapshot.params.id }])
      .subscribe((pageData: PageData) => {
        this.pageData = pageData;
      });
  }
}