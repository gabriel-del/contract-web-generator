import {Component, OnInit} from '@angular/core'
import {FormService} from '../form/form.service'

@Component({
  selector: 'app-dev',
  template: `
  <app-editor></app-editor>
  <app-form-submit></app-form-submit>
  <app-log></app-log>
    <app-pdf showPdf=true savePdf=false></app-pdf>
    <app-debug-form></app-debug-form>
    <app-debug-f></app-debug-f>

  `,
  styles: [
  ]
})
export class Dev implements OnInit{
  constructor(private formService: FormService) {}
  pdfBox: any = ''
  form = this.formService.form
  // tex: string = this.formService.tex
  ngOnInit(): void {
    this.formService.texRead()
  }
}
