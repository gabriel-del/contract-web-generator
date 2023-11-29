import { Component, OnInit, Input } from '@angular/core';
import {FormService} from '../form/form.service'


@Component({
  selector: 'app-debug-form',
  template: `
  <div style="margin-top: 20px" *ngIf="formulario" >
  <div>Detalhes do form</div>
  <pre>Form válido: {{ formulario.valid }}</pre>
  <!--pre>Form submetido: {{ form.submitted }}</pre -->
  <pre>Valores: <br>{{ formulario.value | json }}</pre>
</div>
  `
})
export class DebugForm implements OnInit {

  // @Input() form: any;
  formulario = this.formService.formulario

  constructor(private formService: FormService) { }

  ngOnInit() {
  }

}
