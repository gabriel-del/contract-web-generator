import {FormControl} from '@angular/forms'

export class formValidations {
  static cepValidator(control: FormControl) {
    const cep = control.value
    if (cep === null || cep === '' || /^[0-9]{8}$/.test(cep)) return null
    return {cepInvalido: true}
  }
  static getErrorMsg(validator: string, validatorName: string, validatorValue?: any) {
    let patternMsg = {
      '^[0-9]{11}$': '11 dígitos sequenciais',
      '^[0-9]{7}$': '7 dígitos sequenciais',
      '^[0-9]{10,11}$': '11 dígitos sequenciais',
      '^[a-zA-Z ]*$': 'Apenas letras'
    }
    return {
      required: `${validatorName} é <strong>obrigatório</strong>`,
      minlength: `${validatorName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
      cepInvalido: `Cep Inválido`,
      pattern: `${validatorName} inválido: ${patternMsg[validatorValue.requiredPattern]}`
    }[validator]
  }
}
