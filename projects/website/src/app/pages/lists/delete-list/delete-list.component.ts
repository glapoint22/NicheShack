import { Component, Input } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss']
})
export class DeleteListComponent {
  @Input() listId: string;
  public show: boolean;

  constructor(private dataService: DataService) { }

  onDelete() {
    this.dataService.delete('api/Lists', {
      listId: this.listId
    })
      .subscribe(() => {
        location.href = 'account/lists';
        this.show = false;
      });
  }
}