import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {Home} from './views/home'
import {History} from './views/history'
import {Dev} from './views/dev'

const routes: Routes = [
  {path: '', component: Home},
  {path: 'history', component: History},
  {path: 'dev', component: Dev},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
