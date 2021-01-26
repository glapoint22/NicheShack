import { Component, Input } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'manage-collaborators',
  templateUrl: './manage-collaborators.component.html',
  styleUrls: ['./manage-collaborators.component.scss']
})
export class ManageCollaboratorsComponent {
  @Input() collaborators: Array<any>;
  @Input() listId: string;
  public show: boolean;
  public currentCollaborator: any;
  public confirm: boolean;

  constructor(private dataService: DataService) { }

  onShow() {
    this.currentCollaborator = '';
    this.confirm = false;
  }

  onRemoveCollaborator() {
    // Update database!
    this.dataService.loading = true;
    this.dataService.put('api/Lists/RemoveCollaborator', {
      id: this.currentCollaborator.id,
      listId: this.listId
    })
      .subscribe(() => {
        let index = this.collaborators.findIndex(x => x.id == this.currentCollaborator.id);
        this.collaborators.splice(index, 1);
        this.confirm = false;
        if (this.collaborators.length == 0) this.show = false;
        this.dataService.loading = false;
      });
  }
}