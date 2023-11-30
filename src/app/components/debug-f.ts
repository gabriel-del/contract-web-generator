import { Component, OnInit, Input } from '@angular/core';
import {FormService} from '../form/form.service'


@Component({
  selector: 'app-debug-f',
  template: ` <pre>{{ f | json }}</pre> `
})
export class DebugF implements OnInit {

  formulario = this.formService.formulario
  f!: any


  
  constructor(private formService: FormService) { }
  
  ngOnInit() {
    this.formService.texRead()
    this.f = this.formService.f
    this.formulario.statusChanges.subscribe(_ => {this.formService.texRead() ;this.f = this.formService.f} )
  }

}
