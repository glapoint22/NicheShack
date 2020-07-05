import { Injectable } from '@angular/core';
import { VendorFormComponent } from '../shared-components/forms/vendor-form/vendor-form.component';
import { VideoUrlFormComponent } from '../shared-components/forms/video-url-form/video-url-form.component';
import { Subject } from 'rxjs';
import { FiltersFormComponent } from '../shared-components/forms/filters-form/filters-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public vendorForm: VendorFormComponent;
  public videoUrlForm: VideoUrlFormComponent;
  public onVideoUrlFormSubmit = new Subject<string>();
  public filtersForm: FiltersFormComponent;
}