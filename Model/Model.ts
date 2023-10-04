import fs from 'fs'
import csv from 'csv-parser'

interface Data {
    title: string;
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