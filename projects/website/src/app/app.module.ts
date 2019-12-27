import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageComponent } from './pages/page/page.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ValidationPageComponent } from './pages/validation-page/validation-page.component';
import { ClientInterceptor } from 'interceptors/client-interceptor';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ValidationPageComponent,
    ErrorComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    TransferHttpCacheModule,
    ShowHideModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
