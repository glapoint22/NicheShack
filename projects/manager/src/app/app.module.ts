import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared-components/loading/loading.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShowHideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
