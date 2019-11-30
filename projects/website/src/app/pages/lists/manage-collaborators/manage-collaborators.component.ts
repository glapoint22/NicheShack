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
    this.dataService.delete('api/Lists/Collaborator', {
      customerId: this.currentCollaborator.customerId,
      listId: this.listId
    })
      .subscribe(() => {
        let index = this.collaborators.findIndex(x => x.customerId == this.currentCollaborator.customerId);
        this.collaborators.splice(index, 1);
        this.confirm = false;
        if (this.collaborators.length == 0) this.show = false;
      });
  }
}