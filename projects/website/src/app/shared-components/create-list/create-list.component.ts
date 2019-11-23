import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent {
  @Output() onCreateListHide: EventEmitter<void> = new EventEmitter();
  public show: boolean;
  public name: string;
  public description: string;

  constructor(private dataService: DataService) { }
  
  hide() {
    this.show = false;
    this.onCreateListHide.emit();
  }

  setDefault() {
    this.name = '';
    this.description = '';
  }

  onSubmit() {
    this.dataService.post('api/Lists', {
      name: this.name,
      description: this.description
    })
      .subscribe(() => {
        this.hide();
      })

  }

}
