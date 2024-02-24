import { NgModule } from '@angular/core';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { FooterModule } from './shared/components/footer/footer.module';
import { HeaderModule } from './shared/components/header/header.module';
import { LoaderModule } from './shared/loader/loader.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthUserInterceptor} from './auth-interceptor/auth-user.interceptor';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LoaderModule,
    MatSnackBarModule,
    HeaderModule,
    FooterModule
  ],
  providers: [
    Title,
    Meta,
    {provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
