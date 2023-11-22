import { FormControl } from "@angular/forms";

export class formValidations {
  
  static cepValidator( control: FormControl){
    const cep = control.value
    if (cep != null && cep !== '' && /^[0-9]{8}$/.test(cep)) return null  
    return { cepInvalido: true}
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any){
    const config = {
      'required': `${fieldName} é obrigatório`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
      'cepInvalido': `Cep Inválido`,
    }
    return config[validatorName]
  }

}