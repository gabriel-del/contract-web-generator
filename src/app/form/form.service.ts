import { Injectable } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms'
import { formValidations } from './validations';
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'
import { EstadoBr } from './model';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class FormService {
  items: String[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']

  
  myvar = 123
  texContent!: string
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  formulario: FormGroup = this.formBuilder.group({
    nome: ['Fulano', [Validators.required, Validators.minLength(3)]],
    telefone: [null, []],
    nacionalidade: ['brasileiro', []],
    estadoCivil: ['solteiro', []],
    // cep: [null, []],
    cep: [null, [formValidations.cepValidator]],
    numero: [null, []],
    complemento: [null, []],
    rua: [null, []],
    bairro: [null, []],
    cidade: [null, []],
    estado: [null, []],
    bloco: [null, []],
    hasEndereco: [true, []],
    // items: this.buildItems(),
  })

  g = {
    nome: this.formulario.controls['nome'],
    // nome: 'AAA',
  }
  showVar(){
    console.log(this.g.nome)
    // console.log(this.g.nome)
  }

  texShow(){

  }

 
  texRead(){
    let f = {
      nome: `${this.formulario.controls['nome'].value}`,
      nacionalidade: `${this.formulario.controls['nacionalidade'].value}`,
      estadoCivil: `${this.formulario.controls['estadoCivil'].value}`,
    }
    this.http.get('/assets/main.tex', {responseType: 'text'})
    .pipe(
      map(dados => dados.replaceAll("\\","\\\\").replaceAll("}$", "}")),
      map(dados => eval(`dados = \`${dados}\``) ),
      // tap(dados => console.log(dados))
    )
    .subscribe(dados => this.texContent = dados)
  }

  buildItems(){
    const values = this.items.map(v => new FormControl(false))
    return this.formBuilder.array(values)
  }


  getEstadosBr() {
    return this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json')
}

  getBlocos() {
    return [
      {valor: 'A', desc: 'A'},
      {valor: 'B', desc: 'B'},
      {valor: 'C', desc: 'C'}
    ]
  }

  resetar() {
    this.formulario.reset()
  }

  compilar(){
    console.log("compilou123")
  }


  // this.blocosOp = this.dropdownService.getBlocos()



}
