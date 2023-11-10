import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
 <form [formGroup]="formulario">
  <label>Nome: <input type="text" formControlName="nome"  placeholder="Nome" ></label><br/>
  <label>Email: <input type="email" formControlName="email" placeholder="nome@email.com" ></label><br/>
  <button type="submit">Submit</button>
  <app-debug [form]="formulario"></app-debug>
</form>
  `,
  styles: []
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
