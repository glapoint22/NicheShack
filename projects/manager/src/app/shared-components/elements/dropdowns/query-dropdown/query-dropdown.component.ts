import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'query-dropdown',
  templateUrl: './query-dropdown.component.html',
  styleUrls: ['./query-dropdown.component.scss']
})
export class QueryDropdownComponent extends DropdownComponent implements OnChanges {
  public backgroundColor: string = "#454545";
  public borderLeftTopColor: string = "#5f5f5f";
  public textColor: string = "#c9c9c9";
  public arrowColor: string = "#636363 transparent transparent transparent";

  @Input() logicalOperator: boolean;


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['logicalOperator']) {

      if (this.logicalOperator) {
        this.backgroundColor = "#3a3a3a";
        this.borderLeftTopColor = "#505050";
        this.textColor = "#aeaeae";
        this.arrowColor = "#535353 transparent transparent transparent";
      }
    }
  }
}