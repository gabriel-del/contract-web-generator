import extenso from 'https://cdn.jsdelivr.net/npm/extenso@2.0.1/+esm'
import pluralize from 'https://cdn.jsdelivr.net/npm/pluralize-ptbr@1.0.4/+esm'

export const db = {
  bloco: 'B',
  apartamento: '4',
  data: '01 de janeiro de 2021',
  duracao: '12',
  aluguel: '1200',
  vencimento: '01',
  nome: 'Fulano123',
  cpf: '999.999.999-99',
  identidade: '9.999.999',
  nacionalidade: 'brasileiro',
  profissao: 'autônomo',
  endereco: 'Rua Abc',
  estadoCivil: 'solteiro',
  objetos: [{nome: 'cama', quantidade: 2}, {nome: 'guarda-roupa', quantidade: 2}]
}

export const dbg = {
  aluguelExtenso: extenso(db.aluguel),
  vencimentoExtenso: extenso(db.vencimento),
  dataFinal: db.data,
  enderecoc: endereco(db.bloco),
  enderecoC: endereco(db.bloco),
  limitePessoas: limitePessoas(db.bloco, db.apartamento),
  bicicletas: bicicletas(db.bloco),
  animais: animais(db.bloco),
  garagem: garagem(db.bloco, db.apartamento),
  cpf: db.cpf ? `, CPF nº ${db.cpf}` : '',
  identidade: db.identidade ? `, identidade ${db.identidade}` : '',
  nacionalidade: db.nacionalidade ? `, ${db.nacionalidade}` : '',
  profissao: db.profissao ? `,  ${db.profissao}` : '',
  endereco: db.endereco ? `, residente a ${db.endereco}` : '',
  estadoCivil: db.estadoCivil ? `,  ${db.estadoCivil}` : '',
  objetos: objetos(db.objetos)
}

function endereco(bloco) {
  if (bloco === 'A') return 'Rua Cavalo Marinho, nº 180'
  if (bloco === 'B') return 'Rua Cavalo Marinho, nº 182'
  if (bloco === 'C') return 'Rua Merepe III, S\//N'
}
function limitePessoas(bloco, apartamento) {
  if (bloco === 'A') return '3'
  if (bloco === 'B' && apartamento <= 8) return '5'
  if (bloco === 'B' && apartamento > 8) return '2'
  if (bloco === 'C') return '5'
}
function bicicletas(bloco) {
  if (bloco === 'C') return ''
  return ' As bicicletas devem ser guardadas no bicicletário.'
}
function animais(bloco) {
  if (bloco === 'C') return ''
  return ' É proibido a criação de animais.'
}
function garagem(bloco, apartamento) {
  if (bloco === 'B' && apartamento <= 8) return ' Cada apartamento tem direito a uma vaga de garagem rotativa.'
  return ''
}
function objetos(objetos) {
  let result = ''
  objetos.forEach(objeto => {
    if (objeto.quantidade === 0) return
    if (result !== '') result += ', '
    if (objeto.quantidade === 1) result += `${objeto.quantidade} ${objeto.nome}`
    else result += `${objeto.quantidade} ${plural(objeto.nome)}`
  })
  return result
}
function plural(palavra) {
  if (palavra === 'guarda-roupa') return 'guarda-roupas'
  if (palavra === 'ar-condicionado') return 'ares-condicionados'
  return pluralize(palavra)
}
