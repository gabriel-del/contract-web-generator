import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core'

import {Ace, edit} from 'ace-builds'
import { FormService } from '../form/form.service'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-editor',
  template: `<div #editor ></div>`,
  styles: [`div {
    width: 100%;
    min-height: 700px;
    border: 1px solid gray;
  }`]
})
export class Editor implements OnInit, AfterViewInit, OnChanges {
  constructor(private formService: FormService) {}
  @ViewChild('editor') editorRef!: ElementRef
  @Output() textChange = new EventEmitter<string>()
  text: string
  editor!: Ace.Editor
  ngOnInit(): void { 
    this.formService.tex$.subscribe(_ => {
      this.text = this.formService.tex.value
      this.editor?.setValue(this.text, -1)
    })   
  }
  ngAfterViewInit(): void {
      this.editor = edit(this.editorRef.nativeElement)
      this.editor.setOptions({ showPrintMargin: false, highlightActiveLine: true, tabSize: 2, wrap: true, fontSize: 14, fontFamily: '\'Roboto Mono Regular\', monospace' })
      // All options: https://github.com/ajaxorg/ace/wiki/Configuring-Ace
      this.editor.setValue(this.text, -1)
      this.editor.setReadOnly(false)
      this.editor.setTheme('ace/theme/monokai')
      this.setEditorMode_()
      this.editor.session.setUseWorker(false)
      this.editor.on('change', () => {
          this.text = this.editor.getValue()
            this.textChange.emit(this.text)
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.editor) return
    for (const propName in changes) {
      // if (changes.hasOwnProperty(propName)) {
      if (Object.prototype.hasOwnProperty.call(changes, propName)) {
        switch (propName) {
          case 'text':
              const point = this.editor.getCursorPosition()
              this.editor.setValue(this.text, -1)
              this.editor.moveCursorToPosition(point)
            break
          case 'mode':
              this.setEditorMode_()
            break
          default:
        }
      }
    }
  }
  

  private setEditorMode_(): void {
    this.editor.getSession().setMode(`ace/mode/latex`)
  }
}
