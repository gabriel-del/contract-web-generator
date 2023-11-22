import { Injectable } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms'
import { formValidations } from './validations';
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class FormService {
  items: String[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']

  myvar = 123
  constructor(private formBuilder: FormBuilder) { }
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

  buildItems(){
    const values = this.items.map(v => new FormControl(false))
    return this.formBuilder.array(values)
  }




  // resetar() {
  //   this.formulario.reset()
  // }


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

  // texRead(){
  //   // let myvar = this.formulario.get('numero').value
  //   let myvar = "minha var"
  //   this.http.get('/assets/main.tex', {responseType: 'text'})
  //   .pipe(
  //     map(dados => dados.replaceAll("\\","\\\\").replaceAll("}$", "}")),
  //     map(dados => eval(`dados = \`${dados}\``) ),
  //     // tap(dados => console.log(dados))
  //   )
  //   .subscribe(dados => this.texContent = dados)
  // }

  compilar(){
    console.log("compilou123")
  }

  //  async compilar(){
  //    console.log("Compilar")
  //    this.compileMsg = "Compilando"
  //    const globalEn = await new PdfTeXEngine
  //    await globalEn.loadEngine()
  //    globalEn.writeMemFSFile("main.tex", this.texContent);
  //    globalEn.setEngineMainFile("main.tex");
  //    let r = await globalEn.compileLaTeX();
  //    this.log = r.log
  //    this.compileMsg = "Compilar"

  //    if (r.status === 0) {
  //     let a = document.createElement('a');
  //     // console.log(r.pdf)
  //     a.href = r.pdf
  //     a.download = "12345"
  //     a.click()
  //     console.log(a)
  //     console.log(a.href)
  //     const pdfblob = new Blob([r.pdf], {type : 'application/pdf'});
  //     const objectURL = URL.createObjectURL(pdfblob);
  //     this.pdfBox = objectURL
  //     // console.log(this.pdfBox)
  //   }
  // }
}
