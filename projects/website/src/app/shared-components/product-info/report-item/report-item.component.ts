import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss']
})
export class ReportItemComponent implements OnInit {
  public show: boolean;
  @Input() productId: string;
  public options: Array<any>;
  public selectedWhereOption: any;
  public selectedWhatOption: any;
  public comments: string;
  public submitted: boolean;

  constructor() { }

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
            value: 'not-match-description'
          },
          {
            name: 'Doesn\'t match with product image',
            value: 'not-match-image'
          },
          {
            name: 'Incorrect/Misleading information',
            value: 'incorrect-info'
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
            value: 'too-high'
          },
          {
            name: 'Not correct',
            value: 'not-correct'
          },
          {
            name: 'Other',
            value: 'other'
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
            value: 'not-match'
          },
          {
            name: 'Not enough',
            value: 'not-enough'
          },
          {
            name: 'Not clear',
            value: 'not-clear'
          },
          {
            name: 'Misleading',
            value: 'misleading'
          },
          {
            name: 'Other',
            value: 'other'
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
            value: 'bad-desc'
          },
          {
            name: 'Too vague',
            value: 'vague'
          },
          {
            name: 'Misleading',
            value: 'misleading'
          },
          {
            name: 'Other',
            value: 'other'
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
            value: 'illegal'
          },
          {
            name: 'Adult content',
            value: 'adult'
          },
          {
            name: 'Other',
            value: 'other'
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
            value: 'inactive'
          },
          {
            name: 'Publisher\'s site is down' ,
            value: 'site-down'
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
    this.submitted = true;
    
  }

}
