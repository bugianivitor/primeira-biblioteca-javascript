const trataErros = require('./erros/trataErros')
const fs = require('fs'); // file system
// documentacao da biblioteca: https://nodejs.org/api/fs.html#file-system
// documentacao do metodo readFile: https://nodejs.org/api/fs.html#fsreadfilepath-options-callback

/* Passos: 
1. Receber um arquivo de texto
2. Processar o conteúdo do arquivo
3. Pensar como disponibilizar as informações
*/
/* Erro para leitura de arquivo:
const caminhoArquivo = require('./arquivos/texto-web.txt');

node:internal/modules/cjs/loader:1386
  throw err;
  ^

Error: Cannot find module './arquivos/texto-web.txt'
Require stack:
- E:\05_PROJETOS\01_PROGRAMACAO\javascript\src\index.js
    at Function._resolveFilename (node:internal/modules/cjs/loader:1383:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1025:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1030:22)
    at Function._load (node:internal/modules/cjs/loader:1192:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
    at Module.require (node:internal/modules/cjs/loader:1463:12)
    at require (node:internal/modules/helpers:147:16)
    at Object.<anonymous> (E:\05_PROJETOS\01_PROGRAMACAO\javascript\src\index.js:6:24)
    at Module._compile (node:internal/modules/cjs/loader:1706:14) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ 'E:\\05_PROJETOS\\01_PROGRAMACAO\\javascript\\src\\index.js' ]
}

Node.js v22.19.0

O REQUIRE SOMENTE FUNCIONA COM ARQUIVO JAVASCRIPT OU JSON PORQUE REFERE-SE A MODULOS
*/

const caminhoArquivo = process.argv; // coloca em um array na ordem, o caminho do que eu executar no terminal

// se eu consigo colocar argumentos dentro de um array, eu posso argumentar um arquivo para ele virar um documento acessável no meu código Exemplo:
const link = caminhoArquivo[2];

// O fs.readFile(caminho arquivo, funcao callback)

fs.readFile(link, 'utf-8', (erro, texto) => {
  try {
    if (erro) throw erro
    contaPalavras(texto);
  } catch (erro) {
    console.log(trataErros(erro))
  }
});

function contaPalavras(texto) {
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