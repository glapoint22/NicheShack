import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageComponent } from './pages/page/page.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ValidationPageComponent } from './pages/validation-page/validation-page.component';
import { ClientInterceptor } from 'interceptors/client-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ValidationPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    TransferHttpCacheModule
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
