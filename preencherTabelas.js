const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');
const util = require('util');
/*Criar um método para cadastrar em massa dados provenientes de um arquivo CSV.
Obrigatoriamente os INSERTS realizados nesta atividades devem ser inseridos no banco
através de uma única transação - PONTO ABORDADO NESTE ARQUIVO*/
let connection;

async function inserirDadosCSV(caminhoArquivo, tabela) {
  const query = util.promisify(connection.query).bind(connection);
  const dados = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(caminhoArquivo)
      .pipe(csv())
      .on('data', (row) => dados.push(row))
      .on('end', async () => {
        try {
          await query('START TRANSACTION');
          for (const dado of dados) {
            const colunas = Object.keys(dado).join(', ');
            const valores = Object.values(dado).map(val => `'${val}'`).join(', ');
            const sql = `INSERT INTO ${tabela} (${colunas}) VALUES (${valores})`;
            await query(sql);
          }
          await query('COMMIT');
          resolve();
        } catch (err) {
          await query('ROLLBACK');
          console.error('Erro ao inserir dados: ', err);
          reject(err);
        }
      });
  });
}

async function main() {
  try {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "bd",
        multipleStatements: true
      });
    await inserirDadosCSV('dados_aluno.csv', 'Aluno');
    await inserirDadosCSV('dados_professor.csv', 'Professor');
    console.log('Dados inseridos com sucesso.');
  } catch (err) {
    console.error('Falha ao inserir dados: ', err);
  } finally {
    if (connection && connection.end) connection.end();
  }
}

main();