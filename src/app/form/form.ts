import {Component, OnInit} from '@angular/core'
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators'
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
  apartamentos = {
    A: Array(12).fill(0).map((_, i) => i + 1),
    B: Array(9).fill(0).map((_, i) => i + 1),
    C: Array(6).fill(0).map((_, i) => i + 1)
  }
  aluguelDefaults = {
    A: this.form.get('apartamento').value <  9 ? 1700 : 1200,
    B: 1200,
    C: 1700
  }
  vencimento = Array(31).fill(0).map((_, i) => i + 1)
  limitePessoas = Array(6).fill(0).map((_, i) => i + 1)
  estadoCivil = ['solteiro', 'solteira', 'casado', 'casada', 'divorciado', 'divorciada', 'viúvo', 'viúva']
  ngOnInit(): void {
    this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json').subscribe(dados => {
      this.estados = dados.estados
      this.setDefaultValuesEndereco()
    })
    this.form.get('cep').statusChanges.pipe(
      distinctUntilChanged(),
      tap(value => console.log('status cep: ', value)),
      switchMap(status => status === 'VALID' ? this.http.get(`//viacep.com.br/ws/${this.form.get('cep').value}/json`) : EMPTY)
    ).subscribe((dados: any) =>
      dados ? this.form.patchValue({rua: dados.logradouro, bairro: dados.bairro, cidade: dados.localidade, estado: dados.uf}) : {}
    )
    this.form.get('estado').valueChanges.pipe(
      tap(v => console.log(v)),
      map(estado => this.estados?.filter(({sigla}) => sigla === estado)),
      map(estado => estado[0].cidades)
    ).subscribe(cidades => this.cidades = cidades)

    this.setDefaultValues()
    this.form.valueChanges.subscribe(_ => this.formService.texRead())
    this.form.get('bloco').valueChanges.subscribe(v => this.form.get('aluguel').setValue(this.aluguelDefaults[v]))

  }

  hasError(where: string, what?: string) {
    const field = this.form.controls[where]
    if (field.errors && (field.touched || field.dirty)) return what ? field.errors?.[what] : true
    return false
  }
  hasErrorStyle(field: string) {
    return {
      'has-error': this.hasError(field),
      'has-feedback': this.hasError(field)
    }
  }
  resetar() {this.form.reset()}
  setLimitePessoas = () => {
    // if (value('bloco') === 'A') return 3
    // if (value('bloco') === 'B') return value('apartamento') <= 8 ? 5 : 3
    // if (value('bloco') === 'C') return 2
    return null
  }




  setDefaultValues() {
    this.form.get('bloco').setValue('B')
    this.form.get('apartamento').setValue(4)
    this.form.get('aluguel').setValue(1500)
    this.form.get('dataInicio').setValue('2023-12-01T03:00:00.000Z')
    this.form.get('diaVencimento').setValue(31)
    this.form.get('objetos').setValue('2 camas')
    this.form.get('seeDefaults').setValue(true)
    this.form.get('allowAnimals').setValue(true)
    this.form.get('hasParking').setValue(true)
    this.form.get('hasBikerack').setValue(true)
    this.form.get('limitePessoas').setValue(5)
    this.form.get('nome').setValue('Gabriel')
    this.form.get('nacionalidade').setValue('brasileiro')
    this.form.get('profissao').setValue('autônomo')
    this.form.get('estadoCivil').setValue('solteiro')
    this.form.get('cpf').setValue('00000000000')
    this.form.get('identidade').setValue('0000000')
    this.form.get('celular').setValue('81900000000')
    this.form.get('hasEndereco').setValue(true)
  }
  setDefaultValuesEndereco() {
    // this.form.get('cep').setValue('51030300')
    // this.form.get('cep').setValue('5559000')
    this.form.get('estado').setValue('PE')
    this.form.get('cidade').setValue('Ipojuca')
    this.form.get('bairro').setValue('Porto de Galinhas')
    this.form.get('rua').setValue('Cavalo Marinho')
    this.form.get('numero').setValue(182)
    this.form.get('complemento').setValue('apt 01')
  }

}
