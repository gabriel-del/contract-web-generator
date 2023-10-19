export const code = `
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
rmfamily: zażółć gęsią jaźńaa \\\\
\\ttfamily
ttfamily: zażółć gęsią jaźń \\\\
\\end{document}
`
