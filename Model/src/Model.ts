import fs from 'fs'
import csv from 'csv-parser'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
interface Data {
    title: string;
    country: string;
    value: string;
  }
//Lendo os dados
const readCSV = async (filePath: string) : Promise<Data[]> => {
    return new Promise ((resolve, reject) => {
        const results: Data[] = [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data : Data)=>results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
};
const tabela : Data = {
    title: '2',
    country : '5',
    value : '7'
}

// escrevendo os dados
const writeCSV = async(filePath : string, data : Data[]) : Promise<void>=>{
    data = [
        tabela
    ]
    const csvWriter =  createCsvWriter({
        path:filePath,
        header : [
            {id:'title', title:'TÍTULO'},
            {id:'country',title:'PAIS'},
            {id:'value', title:'VALOR'},
        ],
    });
    return csvWriter.writeRecords(data)
}

const main = async() =>{
    try{
        const data = await readCSV('C:/Users/lucas/OneDrive - Universidade Federal de Minas Gerais/iJunior/Semana 3/Projeto/Projeto-ijunior/db/database.csv');
        console.log('Dados lidos:', data);

        await writeCSV('C:/Users/lucas/OneDrive - Universidade Federal de Minas Gerais/iJunior/Semana 3/Projeto/Projeto-ijunior/db/database.csv' , data);
        console.log('Dados escritos em outupt.csv')
    }catch(error){
        console.error('Erro:',error);
    }
};

main();