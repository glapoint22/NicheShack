import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss']
})
export class ReportItemComponent implements OnInit {
  public show: boolean;
  @Input() productId: number;
  public options: Array<any>;
  public selectedWhereOption: any;
  public selectedWhatOption: any;
  public comments: string;
  public submitted: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.options = [
      {
        name: 'Where is the issue?',
        value: '',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          }
        ]
      },
      {
        name: 'Product Name',
        value: 'name',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          },
          {
            name: 'Doesn\'t match with product description',
            value: 2
          },
          {
            name: 'Doesn\'t match with product image',
            value: 3
          },
          {
            name: 'Other',
            value: 4
          }
        ]
      },
      {
        name: 'Price',
        value: 'price',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          },
          {
            name: 'Too high',
            value: 5
          },
          {
            name: 'Not correct',
            value: 6
          },
          {
            name: 'Other',
            value: 7
          }
        ]
      },
      {
        name: 'Videos & Images',
        value: 'vid-imgs',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          },
          {
            name: 'Different from product',
            value: 8
          },
          {
            name: 'Not enough',
            value: 9
          },
          {
            name: 'Not clear',
            value: 10
          },
          {
            name: 'Misleading',
            value: 11
          },
          {
            name: 'Other',
            value: 12
          }
        ]
      },
      {
        name: 'Product Description',
        value: 'desc',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          },
          {
            name: 'Incorrect description',
            value: 13
          },
          {
            name: 'Too vague',
            value: 14
          },
          {
            name: 'Misleading',
            value: 15
          },
          {
            name: 'Other',
            value: 16
          }
        ]
      },
      {
        name: 'Offensive Product',
        value: 'offensive',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          },
          {
            name: 'Illegal product',
            value: 17
          },
          {
            name: 'Adult content',
            value: 18
          },
          {
            name: 'Other',
            value: 19
          }
        ]
      },
      {
        name: 'Missing Product',
        value: 'missing',
        options: [
          {
            name: 'What is the issue?',
            value: ''
          },
          {
            name: 'Inactive product',
            value: 20
          },
          {
            name: 'Product site is no longer in service',
            value: 21
          },
          {
            name: 'Other',
            value: 22
          }
        ]
      }
    ]

    this.setDefault();
  }

  setDefault() {
    this.selectedWhereOption = this.options[0];
    this.selectedWhatOption = this.options[0].options[0];
    this.submitted = false;
    this.comments = '';
  }

  onSubmit() {
    this.dataService.post('api/Notifications', {
      productId: this.productId,
      type: this.selectedWhatOption.value,
      comments: this.comments
    }).subscribe(() => this.submitted = true);
  }

}
