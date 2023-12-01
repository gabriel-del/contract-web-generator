import {Component, OnInit} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {FormService} from '../form/form.service'
import {PdfTeXEngine} from '../../assets/PdfTeXEngine.js'

@Component({
  selector: 'app-form-submit',
  template: `
    <button mat-fab extended color="primary" (click)="compile()">{{compileMsg[+compiling.value]}} </button>
    <mat-spinner *ngIf="compiling.value"></mat-spinner>
  `,
  styles: [
  ],
})
export class Submit implements OnInit {
  constructor(private formService: FormService) { }
  form = this.formService.form
  compileMsg: string[] = ['Gerar Contrato', 'Gerando o Contrato, Aguarde ...']
  compiling: BehaviorSubject<boolean | null> = this.formService.compiling
  ngOnInit(): void {
    this.formService.compiling$
    // .pipe( tap(v => console.log(v)) )
      .subscribe(a => {if (!a) console.log()})
  }
  async compile() {
    this.formService.compiling.next(true)
    await new Promise(f => setTimeout(f, 1000))
    const globalEn = await new PdfTeXEngine()
    await globalEn.loadEngine()
    globalEn.writeMemFSFile('main.tex', this.formService.tex)
    globalEn.setEngineMainFile('main.tex')
    this.formService.r = await globalEn.compileLaTeX()
    this.formService.compiling.next(false)
  }
  onSubmit() {
    console.log('entrou submit')
    const valueSubmit = Object.assign({}, this.form.value)
    // valueSubmit = Object.assign(valueSubmit, {
    //   items: valueSubmit.items.map((v,i) => v ? this.items[i] : null).filter(v => v !== null)
    // })

    console.log(valueSubmit)
    if (this.form.valid)
      console.log(this.form.value)
      // this.formulario.reset()
    else
      Object.keys(this.form.controls).forEach(field => this.form.controls[field].markAsDirty())
  }
}
