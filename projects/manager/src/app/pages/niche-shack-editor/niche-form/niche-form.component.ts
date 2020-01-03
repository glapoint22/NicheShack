import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'niche-form',
  templateUrl: './niche-form.component.html',
  styleUrls: ['./niche-form.component.scss']
})
export class NicheFormComponent implements OnInit, OnChanges {
  @Input() nicheInput: any;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  public nicheName: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.nicheName = this.nicheInput.name;

    // Get niche with this.nicheInput.id
  }

}
