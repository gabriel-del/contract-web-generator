import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Form } from './form/form';
import {  DebugForm } from './components/debug-form';
import {  DebugF } from './components/debug-f';
import {  ShowError } from './components/showError';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { Home } from './views/home';
import { Footer } from './views/footer';
import { Header } from './views/header';
import { History } from './views/history';
import { Dev } from './views/dev';
import { SafePipe } from './components/safe.pipe';
import { Editor } from './components/editor';
import { Submit } from './components/submit'

@NgModule({
  declarations: [
    AppComponent,
    Form,
    DebugForm,
    DebugF,
    ShowError,
    Home,
    Footer,
    Header,
    History,
    Dev,
    SafePipe,
    Editor,
    Submit,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    Editor
  ]
})
export class AppModule { }
