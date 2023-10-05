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
exports.writeCSV = exports.readCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const prompt = require("prompt-sync")();
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
exports.readCSV = readCSV;
// escrevendo os dados
const writeCSV = (filePath, data) => __awaiter(void 0, void 0, void 0, function* () {
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: filePath,
        header: [
            { id: 'nome', title: 'nome' },
            { id: 'peso', title: 'peso' },
            { id: 'valor', title: 'valor' },
            { id: 'quantidade', title: 'quantidade' }
        ],
    });
    return csvWriter.writeRecords(data);
});
exports.writeCSV = writeCSV;
const tabela = {
    nome: '1',
    peso: '2' + ' kg',
    valor: '3',
    quantidade: '4'
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, exports.readCSV)('./db/database.csv');
        console.log('Dados lidos:', data);
        const valor = prompt('1. Adicionar Item ao Inventário\n\
        2. Remover Item do Inventário\n\
        3. Listar Itens do Inventário\n\
        4. Ver Valor Total do Inventário\n\
        5. Ver Peso Total do Inventário\n\
        6. Calcular Média de Valor dos Itens\n\
        7. Calcular Média de Peso dos Itens\n\
        8. Ver Quantidade Total de Itens no Inventário\n\
        9. Ver Quantidade Total de Produtos no Inventário');
        data.push(tabela);
        yield (0, exports.writeCSV)('./db/database.csv', data);
        console.log(data);
    }
    catch (error) {
        console.error('Erro:', error);
    }
});
main();
//# sourceMappingURL=Model.js.map