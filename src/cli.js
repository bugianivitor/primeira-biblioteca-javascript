import fs from 'fs'
import path from 'path'
import { trataErros } from './erros/trataErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js'
import { Command } from 'commander';

const program = new Command()

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho onde salvar arquivo resultados')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error('favor inserir caminho de origem e destino')
            program.help();
            return
        }

        const caminhoTexto = path.resolve(texto)
        const caminhoDestino = path.resolve(destino)

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log('texto processado com sucesso');
        } catch (erro) {
            console.log('ocorreu um erro no processamento', erro)
        }
    })

program.parse();

function processaArquivo(texto, destino) {
    fs.readFile(link, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino)
        } catch (erro) {
            trataErros(erro)
        }
    });
}


// Precisamos exportar os dados para um arquivo com resultados
// Linha de raciocínio. Executo uma função que recebe os dados, consiga ler ele e transforme em um arquivo de saída legível.
async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`; // Concatena endereço com o nome do arquivo.
    const textoPalavras = montaSaidaArquivo(listaPalavras); //Transforma resultado em objeto de texto legível.
    try { // Inicia tratamento de erro na parte mais crítica do código.
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado');
    } catch (erro) {
        throw erro;
    }
    // fs.promises.writeFile(arquivoNovo, textoPalavras)
    //     .then(() => {
    //         console.log('arquivo-criado')
    //     })
    //     .catch((erro) => {
    //         throw erro    
    //     })
    //     .finally(() => console.log('Operação finalizada.'))
}
/*Anotações sobre Async/Await e Promises
// Como funciona o async await?
 Normalmente, todas as funções são execuitadas simultaneamente em uma cadeia de execução na qual a anterior, sempre executa antes da próxima, e isso faz com que a execução fique mais lenta. É como uma conversa em um Walkie Talkie um dos lados sempre precisa esperar o outro lado terminar a falar para poder falar também.
Já quando falamos de execuções assíncronas, estamos falando de execuções que podem acontecer simultâneamente, enquanto uma resposta está aguardando para chegar o restante da execução do prograsma continua executando, depois o programa vê o que faz com essa resposta.

O Assync sempre vai ser declarado antes da função. Assync function.
Já o await sempre vai ser declarado na linha onde vamos executar o método assíncrono. Se estivéssemos retornando algum dado usaríamos:
const retorno = await ...

Existe uma outra forma de fazer execução assíncrona (não usa assync await, não usa try catch):

Nós fazemos isso com o Then.
Depois da chamada assíncrona nós colocamos.then (uma função callback)
    fs.promises.writeFile()
    .then(() => {
        console.log('arquivo-criado')
    })
    .catch((erro) => {
        throw erro    
    })
    .finally(() => console.log('Operação finalizada.'))

    As promessas, conforme descritas abaixo, são a representação de um status que ainda não existe e não temos como tirar os dados de dentro do objeto fulfilled, o then é responsável por esse desfeixo.
// O que são promises?
 É um objeto que guarda os possíveis estados da promessa: inicialmente o status padrão da promessa é promessa pendente que pode virar fulfilled ou rejected, fulfilled é quando nós temos o retorno esperado e a execução aconteceu com sucesso e rejected é o erro, não deu certo, deu algum problema.*/
