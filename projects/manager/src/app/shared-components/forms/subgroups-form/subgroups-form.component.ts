import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';
import { Item } from '../../../classes/item';
import { ItemListOptions } from '../../../classes/item-list-options';
import { ListItem } from '../../../classes/list-item';
import { MenuOption } from '../../../classes/menu-option';
import { FormService } from '../../../services/form.service';
import { LoadingService } from '../../../services/loading.service';
import { EditableItemListComponent } from '../../item-lists/editable-item-list/editable-item-list.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'subgroups-form',
  templateUrl: './subgroups-form.component.html',
  styleUrls: ['./subgroups-form.component.scss']
})
export class SubgroupsFormComponent extends FormComponent implements OnInit {
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;
  public subgroups: Array<Item> = [];
  public itemListOptions: ItemListOptions;
  public searchInput: HTMLInputElement;

  constructor(
    formService: FormService,
    private dataService: DataService,
    private promptService: PromptService,
    private loadingService: LoadingService
  ) { super(formService) }




  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.formService.subgroupsForm = this;

    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {
        return [
          // New Keyword
          new MenuOption('Add Subgroup', this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Edit Keyword
          new MenuOption('Rename Subgroup', this.itemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
          // Delete Keyword
          new MenuOption('Delete Subgroup', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
        ]
      },
      // On Add Item
      onAddItem: this.addSubgroup,
      // On Add Item
      onEditItem: this.updateSubgroup,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
    }
  }



  // -----------------------------( ON SHOW )------------------------------ \\
  onShow() {
    this.loadingService.loading = true;

    window.setTimeout(() => {
      this.initSearch();
    });

    this.getSubgroups();
  }



  // -----------------------------( GET SUBGROUPS )------------------------------ \\
  getSubgroups() {
    this.dataService.get('api/Subgroups')
      .subscribe((subgroups: Array<Item>) => {
        this.subgroups = subgroups;
        this.loadingService.loading = false;
      });
  }






  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    this.itemList.onListItemAdd();
  }


  // -----------------------------( ON LIST ITEM EDIT )------------------------------ \\
  onListItemEdit() {
    this.itemList.onListItemEdit();
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    // Prompt the user
    this.itemList.itemDeletionPending = true;
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete Subgroup' : 'Delete Subgroups';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected subgroup?' : 'Are you sure you want to delete all the selected subgroups?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteSubgroup, this, null, this.onPromptCancel);
  }


  // -----------------------------( ADD SUBGROUP )------------------------------ \\
  addSubgroup(subgroup: ListItem) {
    this.dataService.post('api/Subgroups', {
      id: 0,
      name: subgroup.name
    }).subscribe((id: number) => {
      subgroup.id = id;
    });
  }


  // -----------------------------( UPDATE SUBGROUP )------------------------------ \\
  updateSubgroup(subgroup: ListItem) {
    this.dataService.put('api/Subgroups', {
      id: subgroup.id,
      name: subgroup.name
    }).subscribe();
  }


  // -----------------------------( DELETE SUBGROUP )------------------------------ \\
  deleteSubgroup() {
    let deletedKeywords: Array<ListItem> = this.itemList.deleteListItem();

    this.dataService.delete('api/Subgroups', { ids: deletedKeywords.map(x => x.id) }).subscribe();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }



  // -----------------------------( INIT SEARCH )------------------------------ \\
  initSearch() {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;

    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap(() => {
          if (this.searchInput.value == '') {
            return this.dataService.get('api/Subgroups');
          }
          return this.dataService.get('api/Subgroups/Search', [{ key: 'searchWords', value: this.searchInput.value }]);
        }))
      .subscribe((searchResults: Array<Item>) => {
        this.subgroups = searchResults;
      });
  }




  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults(input: HTMLInputElement) {
    input.value = '';
    this.getSubgroups();
  }
}