import { Component, OnInit } from '@angular/core';
import {FormService} from '../form/form.service'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-log',
  template: `
     <pre *ngIf="compiling.value===false">{{log}}</pre>
  `,
  styles: [
  ]
})
export class Log implements OnInit{
  constructor( private formService: FormService ){}
  log: any = this.formService.r?.log
  compiling: BehaviorSubject<boolean|null> = this.formService.compiling
  ngOnInit(): void {
    this.formService.compiling$
    // .pipe( tap(v => console.log(v)) )
    .subscribe(a => {if(!a) this.log = this.formService.r?.log})
  }

  
}
