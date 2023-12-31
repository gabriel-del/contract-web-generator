import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {Form} from './form/form'
import {DebugForm} from './components/debug-form'
import {DebugF} from './components/debug-f'
import {MaterialModule} from './material.module'
import {Home} from './views/home'
import {Footer} from './views/footer'
import {Header} from './views/header'
import {History} from './views/history'
import {Dev} from './views/dev'
import {SafePipe} from './components/safe.pipe'
import {Editor} from './components/editor'
import {Submit} from './components/submit'
import {Pdf} from './components/pdf'
import {Log} from './components/log'
import {Field} from './components/field'

@NgModule({
  declarations: [
    AppComponent,
    Form,
    DebugForm,
    DebugF,
    Home,
    Footer,
    Header,
    History,
    Dev,
    SafePipe,
    Editor,
    Submit,
    Pdf,
    Log,
    Field
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    Editor
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AppModule { }
