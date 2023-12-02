import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core'

import {Ace, edit} from 'ace-builds'
import { FormService } from '../form/form.service'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-editor',
  template: `<div #editor class="app-ace-editor"></div>`,
  styles: [`.app-ace-editor {
    width: 100%;
    min-height: 400px;
    border: 1px solid gray;
  }`]
})
export class Editor implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('editor') editorRef!: ElementRef
  @Output() textChange = new EventEmitter<string>()
  // text: string = this.formService.tex
  text: string

  @Input() readOnly: boolean = false
  @Input() mode: string = 'latex'
  @Input() prettify: boolean = true
  editor!: Ace.Editor
  // All possible options can be found at:
  // https://github.com/ajaxorg/ace/wiki/Configuring-Ace
  options = {
    showPrintMargin: false,
    highlightActiveLine: true,
    tabSize: 2,
    wrap: true,
    fontSize: 14,
    fontFamily: '\'Roboto Mono Regular\', monospace'
  }
  constructor(private formService: FormService) {}
  ngOnInit(): void { 
    this.formService.tex$.subscribe(_ => {this.text = this.formService.tex.value, console.log(this.text)})   
  }
  ngAfterViewInit(): void {
    
      this.editor = edit(this.editorRef.nativeElement)
      this.editor.setOptions(this.options)
      this.editor.setValue(this.text, -1)
      this.editor.setReadOnly(this.readOnly)
      this.editor.setTheme('ace/theme/monokai')
      this.setEditorMode_()
      this.editor.session.setUseWorker(false)
      this.editor.on('change', () => {
          this.text = this.editor.getValue()
            this.textChange.emit(this.text)
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.editor)
      return

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
    this.editor.getSession().setMode(`ace/mode/${this.mode}`)
  }
}
