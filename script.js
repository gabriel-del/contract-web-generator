const compileBtn = document.getElementById("compilebtn");
const consoleOutput = document.getElementById("console");
const pdfbox = document.getElementById("pdfbox");


const latex = `
\\documentclass{article}

\\usepackage{tgtermes}
\\renewcommand*\\ttdefault{txtt}

\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}

\\input glyphtounicode
\\pdfgentounicode=1

\\begin{document}
\\noindent
\\rmfamily
rmfamily: zażółć gęsią jaźń \\\\
\\ttfamily
ttfamily: zażółć gęsią jaźń \\\\
\\end{document}
`
console.log(latex)

document.getElementById('editor').innerHTML = latex

const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/latex");
editor.session.setUseWrapMode(true);
editor.setFontSize(18);

const globalEn = new PdfTeXEngine();

async function init() {
  await globalEn.loadEngine();
  compileBtn.innerHTML = "Compile";
  compileBtn.disabled = false;
}

async function compile() {
    if(!globalEn.isReady()) {
        console.log("Engine not ready yet");
        return;
    }
    compileBtn.disabled = true;
    compileBtn.innerHTML = "Compiling...";

    globalEn.writeMemFSFile("main.tex", editor.getValue());
    globalEn.setEngineMainFile("main.tex");
    let r = await globalEn.compileLaTeX();
    consoleOutput.innerHTML = r.log;
    compileBtn.innerHTML = "Compile";
    compileBtn.disabled = false;
    if (r.status === 0) {
        const pdfblob = new Blob([r.pdf], {type : 'application/pdf'});
        const objectURL = URL.createObjectURL(pdfblob);
        setTimeout(()=>{
            URL.revokeObjectURL(objectURL);
        }, 30000);
        console.log(objectURL);
        pdfbox.innerHTML = `<embed src="${objectURL}" width="100%" height="400px" type="application/pdf">`;
    }
}
init();
