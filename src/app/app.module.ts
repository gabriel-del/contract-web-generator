import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Form } from './form';
import {  Debug } from './debug';
import {  ErrorMsg } from './campo-control-erro';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './dropdown.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { Home } from './views/home';
import { Footer } from './views/footer';
import { Header } from './views/header';
import { History } from './views/history';
import { Dev } from './views/dev'

@NgModule({
  declarations: [
    AppComponent,
    Form,
    Debug,
    ErrorMsg,
    Home,
    Footer,
    Header,
    History,
    Dev,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
