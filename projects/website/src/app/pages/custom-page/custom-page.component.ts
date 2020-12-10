import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'services/data.service';
import { PageData } from '../../classes/page-data';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  selector: 'custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements AfterViewInit {
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngAfterViewInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        
          

        this.dataService.get('api/Pages', [{ key: 'id', value: params.get('id') }])
        .subscribe((pageData: PageData) => {
          this.pageContent.page.setData(pageData);
        });
        


      });



    
  }
}