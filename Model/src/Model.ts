import fs from 'fs'
import csv from 'csv-parser'
const prompt = require("prompt-sync")();
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
interface Data {
    nome: string;
    peso: string;
    valor: string;
    quantidade:string;
  }
//Lendo os dados
export const readCSV = async (filePath: string) : Promise<Data[]> => {
    return new Promise ((resolve, reject) => {
        const results: Data[] = [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data : Data)=>results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
};

// escrevendo os dados
export const writeCSV = async(filePath : string, data : Data[]) : Promise<void>=>{
    const csvWriter =  createCsvWriter({
        path:filePath,
        header : [
            {id:'nome', title:'nome'},
            {id:'peso',title:'peso'},
            {id:'valor', title:'valor'},
            {id:'quantidade', title:'quantidade'}
        ],
    });
    return csvWriter.writeRecords(data)
}
    if(fs.existsSync('./db/database.csv')){var variavel = 0}else{variavel = 1}
    if (variavel == 1){
        fs.writeFile('./db/database.csv','', (err) => {
        if (err) {
            console.error('Ocorreu um erro ao criar o arquivo:', err);
        } else {
            console.log();
        }
        })
    };
const main = async() =>{
    try{
        const data = await readCSV('./db/database.csv');
        console.log('Dados lidos:', data);
        const escolha = prompt('        1. Adicionar Item ao Inventário\n\
        2. Remover Item do Inventário\n\
        3. Listar Itens do Inventário\n\
        4. Ver Valor Total do Inventário\n\
        5. Ver Peso Total do Inventário\n\
        6. Calcular Média de Valor dos Itens\n\
        7. Calcular Média de Peso dos Itens\n\
        8. Ver Quantidade Total de Itens no Inventário\n\
        9. Ver Quantidade Total de Produtos no Inventário\n\ ')
        if (escolha == 1){
            const nome = prompt('Nome: ')
            const peso = prompt('Peso: ')
            const valor = prompt('Valor: ')
            const quantidade = prompt('Quantidade: ')
            const tabela:Data = {
                nome:nome,
                peso:peso + 'Kg',
                valor:valor,
                quantidade:quantidade
            }
            if (data.length>0){
                for(var i = 0;i<data.length;i++){
                    if (Object.values(data[i]).includes(nome)){
                        console.log("algo deu errado :(")
                        break}
                    else if(i == data.length-1){
                        data.push(tabela)
                        console.log("DEU CERTO!")
                        break
                    }}
            }else{
                data.push(tabela)
                console.log("DEU CERTO!")
            }
        }
        await writeCSV('./db/database.csv' , data);
        console.log(data)
    }catch(error){
        console.error('Erro:',error);
    }
};

main();