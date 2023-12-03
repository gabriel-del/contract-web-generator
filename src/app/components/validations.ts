import {FormControl} from '@angular/forms'

export class formValidations {
  static cepValidator(control: FormControl) {
    const cep = control.value
    if (cep === null || cep === '' || /^[0-9]{8}$/.test(cep)) return null
    return {cepInvalido: true}
  }
  static getErrorMsg(validator: string, validatorName: string, validatorValue?: any) {
    return {
      required: `${validatorName} é obrigatório`,
      minlength: `${validatorName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
      cepInvalido: `Cep Inválido`
    }[validator]
  }
}
