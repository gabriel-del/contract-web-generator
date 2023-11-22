import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from './dropdown.service';
import { EstadoBr } from './model';
import { formValidations } from './validations';
import {distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators'
import { empty } from 'rxjs';
import {PdfTeXEngine} from './../../assets/PdfTeXEngine.js';
import {myTest} from './../../assets/custom.js';
// import {} from 'https://cdn.jsdelivr.net/npm/ace-builds@1.31.2/src-min-noconflict/ace.min.js'
import * as ace from "ace-builds";
import {FormService} from './form.service'

@Component({
  selector: 'app-form',
  template: `
<form [formGroup]="formulario" (ngSubmit)="onSubmit()">
<mat-form-field [ngClass]="hasErrorStyle('nome')">
     <mat-label>Nome: </mat-label>
     <input type="text" matInput formControlName="nome">
    <app-error-msg [control]="formulario.get('nome')" label="Nome"></app-error-msg>
</mat-form-field>

  <mat-form-field>
    <mat-label>Telefone</mat-label>
    <span matPrefix>+55 &nbsp;</span>
    <input type="tel" matInput formControlName="telefone" placeholder="81 91111-1111">
  </mat-form-field>

  <!-- <mat-form-field [ngClass]="hasErrorStyle('cep')"> -->
    <mat-label>Cep:</mat-label>
     <input type="text" formControlName="cep">
    <app-error-msg [control]="formulario.get('cep')" label="Cep"></app-error-msg>
  <!-- </mat-form-field> -->
  <div [ngClass]="hasErrorStyle('numero')">
    <label>Número: <input type="text" formControlName="numero"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('complemento')">
    <label>Complemento: <input type="text" formControlName="complemento"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('rua')">
    <label>Rua: <input type="text" formControlName="rua"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('bairro')">
    <label>Bairro: <input type="text" formControlName="bairro"></label><br/>
  </div>
  <!-- <div [ngClass]="hasErrorStyle('cidade')">
    <label>Cidade: <input type="text" formControlName="cidade"></label><br/>
  </div> -->
  <div [ngClass]="hasErrorStyle('cidade')">
    <label>Cidade: 
      <select formControlName="cidade">
        <option *ngFor="let cidade of cidades" [value]="cidade">{{cidade}}</option>
      </select>
    </label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('estado')">
    <label>Estado: 
      <select formControlName="estado">
        <option *ngFor="let estado of estados" [value]="estado.sigla">{{estado.nome}}</option>
      </select>
    </label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('bloco')"> Bloco: 
    <label *ngFor="let item of blocosOp"><input type="radio" [value]="item.valor" formControlName="bloco">{{item.desc}}</label>  
  </div>
  <div [ngClass]="hasErrorStyle('hasEndereco')">
    <label>Tem Endereço?<input type="checkbox" formControlName="hasEndereco"></label><br/>
  </div>
  <div [ngClass]="hasErrorStyle('items')" formArrayName="items"> Items: 
    <div   *ngFor="let item of formulario.get('items')['controls']; let i = index">
      <label>{{ items[i] }}<input type="checkbox" [formControlName]="i"></label><br/>
      <!-- <label>Cama<input type="checkbox" formControlName="items"></label><br/> -->
    </div>
  </div>
  
  <button type="submit">Enviar</button>
  <button (click)="resetar()">Cancelar</button>
  <!-- <app-debug [form]="formulario"></app-debug> -->
</form>
<button mat-fab extended color="primary" (click)="compilar()">{{compileMsg}}</button>  
<button mat-fab extended color="primary" (click)="showVar()">show var</button>  
<div class="app-ace-editor"
     style="width: 500px;height: 250px;"
     #editor id="editor">{{texContent}}</div>
<div class="right">
      <!-- <div [innerHTML]="pdfBox"></div> -->
      <!-- <embed #pdf [src]='pdfBox | safe'> -->
      <!-- <embed [src]="pdfBox | safe" style="width: 100%;height: 500px" type="application/pdf">       -->
      <app-editor [(text)]="texContent" mode="json" ></app-editor>
      <object [data]= "pdfBox | safe" width="800" height="500"> </object> 
      <pre>{{log}}</pre>
    </div>
  `,
  styles: [`
  .has-error {
    color: red;
  }`]
})
export class Form implements OnInit {
  formulario!: FormGroup
  estados!: any
  log!: any
  pdfBox: any = ''
  compileMsg: string = "Compilar"
  cidades!: any[]
  texContent: string = 'jkjkj'
  blocosOp!: any[]
  items: any[] = ['Cama', 'TV', 'Geladeira', 'Sofá', 'Armário']

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private formService: FormService
    ){}

  ngOnInit(): void {
    this.blocosOp = this.dropdownService.getBlocos()
    this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados.estados
    })

    console.log(this.formService.myvar)

    this.texRead()
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', "https://ace.c9.io/build/src-noconflict/")

    const aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/monokai");
    aceEditor.session.setMode("ace/mode/latex");
    aceEditor.renderer.attachToShadowRoot()
    aceEditor.setValue(this.texContent)

    aceEditor.on("change", () => {
      this.texContent = aceEditor.getValue()
    });

      console.log("texx:")
      console.log(this.texContent)
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      telefone: [null, []],
      cep: [null, [formValidations.cepValidator]],
      numero: [null, []],
      complemento: [null, []],
      rua: [null, []],
      bairro: [null, []],
      cidade: [null, []],
      estado: [null, []],
      bloco: [null, []],
      hasEndereco: [true, []],
      items: this.buildItems(),
    })

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

  showVar(){
    this.formService.myvar = 3
    console.log(this.formService.myvar)
  }

  buildItems(){
    const values = this.items.map(v => new FormControl(false))
    return this.formBuilder.array(values)
  }

  onSubmit() {
    let valueSubmit = Object.assign({}, this.formulario.value)
    valueSubmit = Object.assign(valueSubmit, {
      items: valueSubmit.items.map((v,i) => v ? this.items[i] : null).filter(v => v !== null)
    })

    console.log(valueSubmit)
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      // this.formulario.reset()
    } else {
      Object.keys(this.formulario.controls).forEach(field => this.formulario.controls[field].markAsDirty())
    }
  }

  resetar() {
    this.formulario.reset()
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

  consultaCEP() {
    const cep = this.formulario.get('cep')?.value?.replace(/\D/g,'')
    if (cep != null && cep !== '' && /^[0-9]{8}$/.test(cep)) 
      this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: any)  =>  this.formulario.patchValue({
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }))
  }

  texRead(){
    // let myvar = this.formulario.get('numero').value
    let myvar = "minha var"
    this.http.get('/assets/main.tex', {responseType: 'text'})
    .pipe(
      map(dados => dados.replaceAll("\\","\\\\").replaceAll("}$", "}")),
      map(dados => eval(`dados = \`${dados}\``) ),
      // tap(dados => console.log(dados))
    )
    .subscribe(dados => this.texContent = dados)
  }

   async compilar(){
     console.log("Compilar")
     this.compileMsg = "Compilando"
     const globalEn = await new PdfTeXEngine
     await globalEn.loadEngine()
     globalEn.writeMemFSFile("main.tex", this.texContent);
     globalEn.setEngineMainFile("main.tex");
     let r = await globalEn.compileLaTeX();
     this.log = r.log
     this.compileMsg = "Compilar"

     if (r.status === 0) {
      let a = document.createElement('a');
      // console.log(r.pdf)
      a.href = r.pdf
      a.download = "12345"
      a.click()
      console.log(a)
      console.log(a.href)
      const pdfblob = new Blob([r.pdf], {type : 'application/pdf'});
      const objectURL = URL.createObjectURL(pdfblob);
      this.pdfBox = objectURL
      // console.log(this.pdfBox)
    }

  
      // console.log(globalEn.loadEngine)


  }








  
}







