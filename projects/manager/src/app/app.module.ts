import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared-components/loading/loading.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { VendorFormComponent } from './shared-components/forms/vendor-form/vendor-form.component';
import { FormComponent } from './shared-components/forms/form/form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    FormComponent,
    VendorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShowHideModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
