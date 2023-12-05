import {FormControl} from '@angular/forms'

export class formValidations {
  static cepValidator(control: FormControl) {
    const cep = control.value
    if (cep === null || cep === '' || /^[0-9]{8}$/.test(cep)) return null
    return {cepInvalido: true}
  }
  static getErrorMsg(validator: string, validatorName: string, validatorValue?: any) {
    const patternMsg = {
      '^[0-9]{11}$': '<strong>11 dígitos</strong> sequenciais',
      '^[0-9]{7}$': '<strong>7 dígitos</strong> sequenciais',
      '^[0-9]{10,11}$': '<strong>11 dígitos</strong> sequenciais',
      '^[0-9]{3,4}$': '<strong>4 dígitos</strong> sequenciais',
      '^[A-zÀ-ú ]*$': '<strong>Apenas letras</strong>',
      '^(?!\\s)(?!.*\\s$).*$': '<strong>sem espaços</strong> no início e no fim'
    }
    return {
      required: `${validatorName} é <strong>obrigatório</strong>`,
      minlength: `${validatorName} precisa ter no mínimo <strong>${validatorValue.requiredLength}</strong> caracteres`,
      cepInvalido: `Cep Inválido`,
      pattern: `${validatorName} inválido: ${patternMsg[validatorValue.requiredPattern]}`
    }[validator]
  }
}
