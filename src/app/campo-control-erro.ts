import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  template: `
  <div *ngIf="show" >
  <span class="glyphicon glyphicon-remove form-control-feedback"></span>
  <!-- <span class="sr-only">(error)</span> -->
  <div class="alert alert-danger errorDiv" role="alert">
    {{ msgErro }}
  </div>
</div>
`
})
export class CampoControlErro implements OnInit {

  @Input() msgErro!: string;
  @Input() show!: boolean;

  constructor() { }

  ngOnInit() {
  }

}
