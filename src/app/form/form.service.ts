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
    nome: [null, [Validators.required, Validators.minLength(3)]],
    telefone: [null, []],
    cep: [null, []],
    // cep: [null, [formValidations.cepValidator]],
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

 
  texRead(){
    let f = {
      numero: `${this.formulario.controls['numero'].value}`
    }
    this.http.get('/assets/main.tex', {responseType: 'text'})
    .pipe(
      map(dados => dados.replaceAll("\\","\\\\").replaceAll("}$", "}")),
      map(dados => eval(`dados = \`${dados}\``) ),
      tap(dados => console.log(dados))
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


  // formulario.get('cep').statusChanges
  // .pipe(
  //   distinctUntilChanged(),
  //   tap( value => console.log("status cep: ", value) ),
  //   switchMap(status => status === 'VALID' ? 
  //   this.http.get(`//viacep.com.br/ws/${this.formulario.get('cep').value}/json`) :
  //   empty()
  //   )
  // )
  // .subscribe(
  //   (dados: any) => dados ? this.formulario.patchValue({
  //     rua: dados.logradouro,
  //     bairro: dados.bairro,
  //     cidade: dados.localidade,
  //     estado: dados.uf
  // }) : {} )

  // formulario.get('estado').valueChanges
  // .pipe(
  //   map(estado => this.estados.filter(({sigla}) => sigla === estado)),
  //   map(estado => estado[0].cidades),
  // )
  // .subscribe(cidades => this.cidades = cidades)

  // consultaCEP() {
  //   const cep = this.formulario.get('cep')?.value?.replace(/\D/g,'')
  //   if (cep != null && cep !== '' && /^[0-9]{8}$/.test(cep)) 
  //     this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: any)  =>  this.formulario.patchValue({
  //       rua: dados.logradouro,
  //       bairro: dados.bairro,
  //       cidade: dados.localidade,
  //       estado: dados.uf
  //   }))
  // }



  compilar(){
    console.log("compilou123")
  }


  // this.blocosOp = this.dropdownService.getBlocos()
  // this.dropdownService.getEstadosBr().subscribe(dados => {
  //   this.estados = dados.estados
  // })


}
