import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
 <form class="form-horizontal" [formGroup]="formulario">
  <div class="form-group">
    <div class="col-sm-12">
      <label for="nome" class="control-label">Nome</label>
    </div>

    <div class="col-sm-12">
      <input type="text" class="form-control" formControlName="nome" 
        id="nome" placeholder="Nome" >
     </div>
  </div>

  <div class="form-group">
    <div class="col-sm-12">
      <label for="email" class="control-label">Email</label>
    </div>
    <div class="col-sm-12">
      <input type="email" class="form-control" formControlName="email"
        id="email" placeholder="nome@email.com" >
    </div>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>

  <app-debug [form]="formulario"></app-debug>
</form>
  `,
  styles: [
  ]
})
export class Form implements OnInit {
  formulario!: FormGroup

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    })
  }

}
