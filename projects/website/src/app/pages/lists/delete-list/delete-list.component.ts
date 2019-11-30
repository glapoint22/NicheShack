import { Component, Input } from '@angular/core';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss']
})
export class DeleteListComponent {
  @Input() listId: string;
  @Input() lists: Array<any>;
  public show: boolean;

  constructor(private dataService: DataService, private router: Router) { }

  onDelete() {
    this.dataService.delete('api/Lists', {
      listId: this.listId
    })
      .subscribe(() => {
        this.router.navigate(['account', 'lists']);
        let index = this.lists.findIndex(x => x.listId == this.listId);
        this.lists.splice(index, 1);
        this.show = false;
      });
  }

}
