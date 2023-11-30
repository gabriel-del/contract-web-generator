import { Component, OnInit, Input } from '@angular/core';
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-debug-form',
  template: `
  <div style="margin-top: 20px" >
  <div>Detalhes do form</div>
  <pre>Form válido: {{ form.valid }}</pre>
  <!--pre>Form submetido: {{ form.submitted }}</pre -->
  <pre>Valores: <br>{{ form.value | json }}</pre>
</div>
  `
})
export class DebugForm implements OnInit {
  form = this.formService.form

  constructor(private formService: FormService) { }

  ngOnInit() {
  }

}
