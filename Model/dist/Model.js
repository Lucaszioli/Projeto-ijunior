"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const csv_writer_1 = require("csv-writer");
//Lendo os dados
const readCSV = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
});
const tabela = {
    title: '2',
    country: '5',
    value: '7'
};
// escrevendo os dados
const writeCSV = (filePath, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.push(tabela);
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: filePath,
        header: [
            { id: 'title', title: 'TÍTULO' },
            { id: 'country', title: 'PAIS' },
            { id: 'value', title: 'VALOR' },
        ],
    });
    return csvWriter.writeRecords(data);
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield readCSV('C:/Users/lucas/OneDrive - Universidade Federal de Minas Gerais/iJunior/Semana 3/Projeto/Projeto-ijunior/db/database.csv');
        console.log('Dados lidos:', data);
        yield writeCSV('C:/Users/lucas/OneDrive - Universidade Federal de Minas Gerais/iJunior/Semana 3/Projeto/Projeto-ijunior/db/database.csv', data);
        console.log('Dados escritos em outupt.csv');
    }
    catch (error) {
        console.error('Erro:', error);
    }
});
main();
//# sourceMappingURL=Model.js.map