import {FormControl} from '@angular/forms'

export class formValidations {
  static cepValidator(control: FormControl) {
    const cep = control.value
    if (cep === null || cep === '' || /^[0-9]{8}$/.test(cep)) return null
    return {cepInvalido: true}
  }
  static getErrorMsg(validator: string, validatorName: string, validatorValue?: any) {
    let patternMsg = {
      '^[0-9]{11}$': '<strong>11 dígitos</strong> sequenciais',
      '^[0-9]{7}$': '<strong>7 dígitos</strong> sequenciais',
      '^[0-9]{10,11}$': '<strong>11 dígitos</strong> sequenciais',
      '^[a-zA-Z ]*$': '<strong>Apenas letras</strong>'
    }
    return {
      required: `${validatorName} é <strong>obrigatório</strong>`,
      minlength: `${validatorName} precisa ter no mínimo <strong>${validatorValue.requiredLength}</strong> caracteres`,
      cepInvalido: `Cep Inválido`,
      pattern: `${validatorName} inválido: ${patternMsg[validatorValue.requiredPattern]}`
    }[validator]
  }
}
