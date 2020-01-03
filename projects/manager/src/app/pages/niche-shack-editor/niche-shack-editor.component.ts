import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'niche-shack-editor',
  templateUrl: './niche-shack-editor.component.html',
  styleUrls: ['./niche-shack-editor.component.scss']
})
export class NicheShackEditorComponent implements OnInit {
  public showProductForm: boolean;
  public showNicheForm: boolean;
  public item: any;

  constructor() { }

  ngOnInit() {
  }

  showForm(data: any) {
    if (data.type == 'product') {
      this.showProductForm = true;
      this.showNicheForm = false;
    } else {
      this.showNicheForm = true;
      this.showProductForm = false;
    }

    this.item = data.item;
  }

}
