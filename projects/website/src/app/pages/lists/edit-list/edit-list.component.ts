import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  @Input() list: any;
  public show: boolean;
  public name: string;
  public description: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onShow() {
    this.name = this.list.name;
    this.description = this.list.description;
  }

  onSave() {
    // Update database
    this.dataService.put('api/Lists', {
      id: this.list.id,
      name: this.name,
      description: this.description
    })
      .subscribe((list: any) => {
        this.list.name = list.name;
        this.list.description = list.description;
        this.show = false;
      });
  }
}