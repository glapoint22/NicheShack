import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';
import { ListFormItem } from '../../../classes/list-form-item';
import { FormService } from '../../../services/form.service';
import { LoadingService } from '../../../services/loading.service';
import { ListFormComponent } from '../list-form/list-form.component';

@Component({
  selector: 'subgroups-form',
  templateUrl: '../list-form/list-form.component.html',
  styleUrls: ['../list-form/list-form.component.scss']
})
export class SubgroupsFormComponent extends ListFormComponent implements OnInit {

  constructor(
    formService: FormService,
    dataService: DataService,
    promptService: PromptService,
    loadingService: LoadingService
  ) { super(formService, dataService, promptService, loadingService) }


  ngOnInit() {
    this.formService.subgroupsForm = this;
    this.listFormItem = new ListFormItem('Subgroup', 'api/Subgroups');
    super.ngOnInit();
  }
}