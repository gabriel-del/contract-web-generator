import { FormControl } from "@angular/forms";

export class formValidations {
  
  static cepValidator( control: FormControl){
    const cep = control.value
    if (cep != null && cep !== '' ){
      return /^[0-9]{8}$/.test(cep) ? null : { cepInvalido: true}
    }
    return null
  }



}