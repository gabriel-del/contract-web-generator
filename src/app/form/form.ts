import {Component, OnInit} from '@angular/core'
import {distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators'
import {EMPTY} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {EstadoBr} from '../components/model'
import {FormService} from './form.service'

@Component({selector: 'app-form', templateUrl: './form.html', styleUrls: ['./form.scss']})
export class Form implements OnInit {
  constructor(private formService: FormService, private http: HttpClient) {}
  cidades!: any[]
  blocosOp!: any[]
  form = this.formService.form
  estados!: any
  array = n => Array(n).fill(0).map((_, i) => i + 1)
  apartamentos = {A: this.array(9), B: this.array(12), C: this.array(6)}
  vencimento = this.array(31)
  limitePessoas = this.array(6)
  blocos = ['A', 'B', 'C']
  estadoCivil = ['solteiro', 'solteira', 'casado', 'casada', 'divorciado', 'divorciada', 'viúvo', 'viúva']
  ngOnInit(): void {
    this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json').subscribe(dados => {
      this.estados = dados.estados
      // this.setDefaultValues(['cep', 'estado', 'cidade', 'bairro', 'rua', 'numero', 'complemento'])
    })
    this.form.get('cep').statusChanges.pipe(
      distinctUntilChanged(),
      // tap(value => console.log('status cep: ', value)),
      switchMap(status => status === 'VALID' && /^[0-9]{8}$/.test(this.formService.form.get('cep').value) ? this.http.get(`//viacep.com.br/ws/${this.form.get('cep').value}/json`) : EMPTY)
    ).subscribe((dados: any) =>
      dados ? this.form.patchValue({rua: dados.logradouro, bairro: dados.bairro, cidade: dados.localidade, estado: dados.uf}) : {}
    )
    this.form.get('estado').valueChanges.pipe(
      // tap(v => console.log(v)),
      filter(estado => !!estado),
      map(estado => this.estados?.filter(({sigla}) => sigla === estado)),
      map(estado => estado[0].cidades)
    ).subscribe(cidades => this.cidades = cidades)
    
    this.setDefaultValues(['diaVencimento'])
    // this.setDefaultValues(['bloco', 'apartamento', 'aluguel', 'dataInicio', 'diaVencimento', 'objetos', 'seeDefaults', 'allowAnimals', 'hasParking', 'hasBikerack', 'limitePessoas', 'nome', 'nacionalidade', 'profissao', 'estadoCivil', 'cpf', 'identidade', 'celular', 'hasEndereco' ])
    this.form.valueChanges.subscribe(_ => this.formService.texRead())
    this.form.get('bloco').valueChanges.subscribe(v => this.blocoDefaults(v))
    this.form.get('apartamento').valueChanges.subscribe(_ => this.blocoDefaults(this.form.get('bloco').value))
  }
  blocoDefaults(v: string) {
    if (v === 'B') v = this.form.get('apartamento').value < 9 ? 'B1' : 'B2'
    this.form.get('aluguel').setValue({A: 1200, B1: 1700, B2: 1200, C: 1700}[v])
    this.form.get('allowAnimals').setValue({A: false, B1: false, B2: false, C: true}[v])
    this.form.get('hasParking').setValue({A: false, B1: true, B2: false, C: false}[v])
    this.form.get('hasBikerack').setValue({A: true, B1: true, B2: true, C: false}[v])
    this.form.get('limitePessoas').setValue({A: 3, B1: 5, B2: 2, C: 5}[v])
  }
  resetar() {this.form.reset()}

  setDefaultValues(array: string[]) {
    let values: ((string | number)[] | (string | boolean)[])[] = [
      ['bloco', 'B'],
      ['apartamento', 4],
      ['aluguel', '1500'],
      ['dataInicio', '2023-12-01T03:00:00.000Z'],
      ['diaVencimento', 31],
      ['objetos', '2 camas'],
      ['seeDefaults', true],
      ['allowAnimals', true],
      ['hasParking', true],
      ['hasBikerack', true],
      ['limitePessoas', 5],
      ['nome',  'Gabriel'],
      ['nacionalidade', 'brasileiro'],
      ['profissao', 'autônomo'],
      ['estadoCivil', 'solteiro'],
      ['cpf', '00000000000'],
      ['identidade', '0000000'],
      ['celular', '81900000000'],
      ['hasEndereco', true],
      ['cep', '51030300'],
      ['estado', 'PE'],
      ['cidade', 'Ipojuca'],
      ['Bairro', 'Porto de Galinhas'],
      ['rua', 'Cavalo Marinho'],
      ['numero', 182],
      ['complemento', 'apt 01']
    ]
    values.filter((v: any[]) => array.includes(v[0])).forEach((v: any[]) => this.form.get(v[0]).setValue(v[1]))
  }
}
