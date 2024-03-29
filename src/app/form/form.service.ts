import {Injectable} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {map} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject} from 'rxjs'
import * as extensoApi from 'extenso'
import {formValidations} from '../components/validations'

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  items: string[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']
  f: any
  r: any
  tex: BehaviorSubject<string> = new BehaviorSubject<string>('')
  tex$ = this.tex.asObservable()
  compiling: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null)
  compiling$ = this.compiling.asObservable()
  form: FormGroup = this.formBuilder.group({
    bloco: [null, [Validators.required]],
    apartamento: [null, [Validators.required]],
    aluguel: [null, [Validators.required, Validators.pattern('^(?!\\s)(?!.*\\s$).*$'), Validators.pattern('[0-9]{3,4}')]],
    dataInicio: [null, [Validators.required]],
    diaVencimento: [null, [Validators.required]],
    objetos: [null, [Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    seeDefaults: [null, []],
    allowAnimals: [null, [Validators.required]],
    hasParking: [null, [Validators.required]],
    hasBikerack: [null, [Validators.required]],
    limitePessoas: [null, [Validators.required]],
    // cep: [null, []],
    // INQUILINO
    nome: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[A-zÀ-ú ]*'), Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    nacionalidade: [null, [Validators.pattern('[A-zÀ-ú ]*'), Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    profissao: [null, [Validators.pattern('[A-zÀ-ú ]*'), Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    estadoCivil: [null, []],
    cpf: [null, [Validators.pattern('[0-9]{11}'), Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    identidade: [null, [Validators.pattern('[0-9]{7}.*'), Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    celular: [null, [Validators.pattern('[0-9]{10,11}'), Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    // ENDEREÇO
    hasEndereco: [null, []],
    cep: [null, [formValidations.cepValidator]],
    estado: [null, []],
    cidade: [null, []],
    bairro: [null, [Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    rua: [null, [Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]],
    numero: [null, []],
    complemento: [null, [Validators.pattern('^(?!\\s)(?!.*\\s$).*$')]]
    // items: this.buildItems(),
  })
  texRead() {
    const value = (field: string): string => this.form.controls[field].value
    const endereco: {[_: string]: string} = {
      A: 'Rua Cavalo Marinho, nº 180',
      B: 'Rua Cavalo Marinho, nº 182',
      C: 'Rua Merepe III, S\//N'
    }
    // const extenso = n => n
    const getDate = (n?: number) => {
      const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const data = new Date(value('dataInicio'))
      return `${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear() + (n || 0)} `
    }
    const capitalize = (i: string): string => i.toLocaleLowerCase().replace(/\b\w/g, c => c.toUpperCase())
    const getEndereco = (): string => {
      const bairro = value('bairro') ? `, bairro ${capitalize(value('bairro'))}` : ''
      const rua = value('rua') ? `, rua ${capitalize(value('rua')).replace('Rua ', '')}` : ''
      const numero = value('numero') ? `, número ${value('numero')}` : ''
      const complemento = value('complemento') ? `, ${capitalize(value('complemento'))}` : ''
      const cep = value('cep') ? `, CEP nº ${value('cep').toString().replace(/(\d{5})(\d{3})/, '$1-$2')}` : ''
      return `, residente a  ${value('cidade')}-${value('estado')}${bairro}${rua}${numero}${complemento}${cep}`
    }
    const extenso = (v: any, g: string = 'm'): string => {
      v = Number(v)
      if (Number.isNaN(v)) return ''
      if (v === 0) return 'zero'
      return (extensoApi(v, {number: {gender: g}}) as string).replace(/^mil\b/, 'hum mil')
    }
    const f = {
      // 1 section
      enderecoc: endereco[value('bloco')] ?? '',
      enderecoC: (endereco[value('bloco')] ?? '').toUpperCase(),
      apartamento: value('apartamento'),
      aluguel: value('aluguel').toString().replace(/(\d{1})(\d{3})/, '$1.$2'),
      // aluguel: value('aluguel'),
      aluguelExtenso: extenso(value('aluguel')),
      dataInicio: getDate(),
      dataFinal: getDate(1),
      diaVencimento: value('diaVencimento'),
      diaVencimentoExtenso: extenso(value('diaVencimento')),
      objetos: value('objetos') ? `\\item Os objetos citados nesta cláusula: ${value('objetos')};\n` : '',
      // dataFinal: value('dataFinal'),
      // 2 section
      animais: value('allowAnimals') ? '' : '. É proibido a criação de animais',
      garagem: value('hasParking') ? '. Cada apartamento tem direito a uma vaga de garagem rotativa' : '',
      bicicletas: value('hasBikerack') ? '. As bicicletas devem ser guardadas no bicicletário' : '',
      limitePessoas: value('limitePessoas'),
      limitePessoasExtenso: extenso(value('limitePessoas'), 'f'),
      // 3 section
      nome: `${capitalize(value('nome') ?? '')}`,
      nacionalidade: value('nacionalidade') ? `, ${value('nacionalidade').toLocaleLowerCase()}` : '',
      profissao: value('profissao') ? `, ${value('profissao').toLocaleLowerCase()}` : '',
      estadoCivil: value('estadoCivil') ? `,  ${value('estadoCivil')}` : '',
      cpf: value('cpf') ? `, CPF nº ${value('cpf').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}` : '',
      // cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      identidade: value('identidade') ? `, identidade ${value('identidade').toUpperCase()}` : '',
      // identidade: value('identidade') ? `, identidade ${value('identidade').replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3').toUpperCase()}` : '',
      celular: value('celular') ? `, celular ${value('celular').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}` : '',
      // 4 section
      endereco: value('hasEndereco') ? getEndereco() : ''

    }
    this.f = f

    // console.log(JSON.stringify(f, null, 2))
    this.http.get('assets/main.tex', {responseType: 'text'})
      .pipe(
        map(dados => dados.replaceAll('\\', '\\\\').replaceAll(/}\$( )?(\r\n|\r|\n)?/g, '}')),
        map(dados => eval(`dados = \`${dados}\``))
        // tap(dados => console.log(dados))
      ).subscribe(dados => this.tex.next(dados))
  }
  buildItems() {
    const values = this.items.map(_ => new FormControl(false))
    return this.formBuilder.array(values)
  }
}
