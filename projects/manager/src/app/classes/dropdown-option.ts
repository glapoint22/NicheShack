import { KeyValue } from '@angular/common';
import { DropdownMenu } from './dropdown-menu';

export class DropdownOption {
    constructor(public option: KeyValue<any, any>) { }

    // -----------------------------( ON CLICK )------------------------------ \\
    onClick(dropdownMenu: DropdownMenu, dropdownOption: DropdownOption) {
        let selectedOption = dropdownOption;
        let selectedIndex = this.getIndex(dropdownMenu, dropdownOption);

        // As long as the index of the selected option is not 0 and the key is not other
        if (!(selectedIndex == 0 && dropdownMenu.list[0].option.key == "Other")) {
            // Define the selected option
            dropdownMenu.selectedOption = selectedOption;
            // Define the index of the selected option
            dropdownMenu.selectedIndex = selectedIndex;
            // Hide the menu
            dropdownMenu.isVisible = false;
            // Update the selected index
            dropdownMenu.selectedIndex = dropdownMenu.selectedIndex;
            // Call the function that gets executed when an menu option is selected
            dropdownMenu.optionSelectFunction.apply(dropdownMenu.currentObj)
        }
    }


    // -----------------------------( GET INDEX )------------------------------ \\
    getIndex(dropdownMenu: DropdownMenu, dropdownOption: DropdownOption) {
        return dropdownMenu.list.findIndex(x => x == dropdownOption);
    }
}