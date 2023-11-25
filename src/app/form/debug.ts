import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-debug',
  template: `
  <div style="margin-top: 20px" *ngIf="form" >
  <div>Detalhes do form</div>
  <pre>Form válido: {{ form.valid }}</pre>
  <!--pre>Form submetido: {{ form.submitted }}</pre -->
  <pre>Valores: <br>{{ form.value | json }}</pre>
</div>
  `
})
export class Debug implements OnInit {

  @Input() form: any;

  constructor() { }

  ngOnInit() {
  }

}