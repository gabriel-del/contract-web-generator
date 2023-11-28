import { Component, OnInit } from '@angular/core';
import {FormService} from './form.service'
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'
import { empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from './model';



@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class Form implements OnInit {
  cidades!: any[]
  blocosOp!: any[]
  formulario = this.formService.formulario
  form = this.formService
  estados!: any
  apartamentos = {
    'a': Array(12).fill(0).map((_,i)=>i+1),
    'b': Array(9).fill(0).map((_,i)=>i+1),
    'c': Array(6).fill(0).map((_,i)=>i+1),
  }
  vencimento = Array(31).fill(0).map((_,i)=>i+1)
  limitePessoas = Array(6).fill(0).map((_,i)=>i+1)
  estadoCivil = ['solteiro', 'solteira', 'casado', 'casada', 'divorciado', 'divorciada', 'viúvo', 'viúva']

  constructor( private formService: FormService , private http: HttpClient ){}


  ngOnInit(): void { 
    this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json').subscribe(dados => { this.estados = dados.estados })
    this.form.texRead()
    // this.formulario.statusChanges.subscribe(_ => this.form.texRead())
    this.formulario.valueChanges.subscribe(_ => this.form.texRead())
    this.formulario.get('cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      tap( value => console.log("status cep: ", value) ),
      switchMap(status => status === 'VALID' ? 
      this.http.get(`//viacep.com.br/ws/${this.formulario.get('cep').value}/json`) :
      empty()
      )
    )
    .subscribe(
      (dados: any) => dados ? this.formulario.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }) : {} )
  
    this.formulario.get('estado').valueChanges
    .pipe(
      map(estado => this.estados.filter(({sigla}) => sigla === estado)),
      map(estado => estado[0].cidades),
    )
    .subscribe(cidades => this.cidades = cidades)
  }

  hasError(where: string, what?: string) {
    let field = this.formulario.controls[where]
    if (field.errors && (field.touched || field.dirty))  return !!what ?  field.errors?.[what] :  true
    return false

  }

  hasErrorStyle(field: string) {
    return {
      'has-error': this.hasError(field),
      'has-feedback': this.hasError(field)
    }
  }

  resetar() { this.formulario.reset() }

  
  
}







