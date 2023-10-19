import * as latex from './latex.js'


document.getElementById('editor').innerHTML = latex.code

const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/latex");
editor.session.setUseWrapMode(true);
editor.setFontSize(18);

const globalEn = new PdfTeXEngine();

document.addEventListener("DOMContentLoaded", async () => {
  await globalEn.loadEngine();
  compile.addEventListener('click', async () => {
    if(!globalEn.isReady()) {
        console.log("Engine not ready yet");
        return;
    }
    compile.disabled = true;
    compile.innerHTML = "Compiling...";

    globalEn.writeMemFSFile("main.tex", editor.getValue());
    globalEn.setEngineMainFile("main.tex");
    let r = await globalEn.compileLaTeX();
    log.innerHTML = r.log;
    compile.innerHTML = "Compile";
    compile.disabled = false;
    if (r.status === 0) {
        const pdfblob = new Blob([r.pdf], {type : 'application/pdf'});
        const objectURL = URL.createObjectURL(pdfblob);
        setTimeout(()=>{
            URL.revokeObjectURL(objectURL);
        }, 30000);
        console.log(objectURL);
        pdfbox.innerHTML = `<embed src="${objectURL}" width="100%" height="400px" type="application/pdf">`;
    }
  })
})
