export function contaPalavras(texto) {
  const paragrafos = extraiParagrafos(texto)
  const contagem = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return []
    return contadorDePalavras(paragrafo)
  })
  console.log(contagem);
}

function extraiParagrafos(texto) {
  return texto.toLowerCase().split('\n');
}

function limpaPalavras(palavra) {
  return palavra.replace(/[^a-zA-Z0-9]/g,'')
}

function contadorDePalavras(paragrafos) {
  const palavras = paragrafos.split(' ');
  const quantidade = {}
  palavras.forEach(palavra => {
    if (palavras.length >= 3) {
      const palavraLimpa = limpaPalavras(palavra)
      quantidade[palavraLimpa] = (quantidade[palavraLimpa] || 0) + 1
    }
  });
  return quantidade
}