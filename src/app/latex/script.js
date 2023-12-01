import {db} from './form.js'

function read(file) {
  let response
  const xhttp = new XMLHttpRequest()
  xhttp.onload = () => response = this.responseText
  xhttp.open('GET', file, false)
  xhttp.send()
  eval(`response = \`${response.replaceAll('\\', '\\\\').replaceAll('}$', '}')}\``)
  return response
}

document.addEventListener('DOMContentLoaded', async () => {
// document.getElementById('editor').innerHTML = latex.code
  document.getElementById('editor').innerHTML = read('/src/assets/main.tex')
  const editor = ace.edit('editor')
  editor.setTheme('ace/theme/monokai')
  editor.session.setMode('ace/mode/latex')
  editor.session.setUseWrapMode(true)
  editor.setFontSize(18)
  // console.log(dbg.objetos)
  const globalEn = await new PdfTeXEngine()
  await globalEn.loadEngine()
  compile.addEventListener('click', async () => {
    compile.disabled = true
    compile.innerHTML = 'Compilando...'
    globalEn.writeMemFSFile('main.tex', editor.getValue())
    globalEn.setEngineMainFile('main.tex')
    const r = await globalEn.compileLaTeX()
    log.innerHTML = r.log
    compile.innerHTML = 'Compilar'
    compile.disabled = false
    if (r.status === 0) {
      const pdfblob = new Blob([r.pdf], {type: 'application/pdf'})
      const objectURL = URL.createObjectURL(pdfblob)
      setTimeout(() => URL.revokeObjectURL(objectURL), 30000)
      download.href = objectURL
      download.download = db.nome
      download.click()
      pdfbox.innerHTML = `<embed src="${objectURL}" width="100%" height="400px" type="application/pdf">`
    }
  })
})
