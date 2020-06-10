import { Injectable } from '@angular/core';
import { VendorFormComponent } from '../shared-components/forms/vendor-form/vendor-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public vendorForm: VendorFormComponent;
  
}