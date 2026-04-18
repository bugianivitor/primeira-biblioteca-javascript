function filtraOcorrencias(paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = ''
    listaPalavras.forEach( (paragrafo, index) => {
     const duplicadas = filtraOcorrencias(paragrafo).join(', ');
     if (duplicadas) {
         textoFinal += `palavras duplicadas no parágrafo ${index + 1}: ${duplicadas} \n`
     }
    })
    return textoFinal
}

// Para transformar um array em texto eu posso usar a função .join. Além disso, para o .join, eu posso passar (', ') para dizer que além dos itens do array, eu incluo vírgula e espaço depois de cada palavra. 

export { montaSaidaArquivo }