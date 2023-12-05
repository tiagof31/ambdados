const mysql = require('mysql');
const fs = require('fs');
const util = require('util');
/*Realizar uma consulta utilizando JOIN e Realizar uma exportação para CSV de pelo menos uma consulta executada no banco - PONTOS ABORDADO NESTE ARQUIVO*/

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "bd",
    multipleStatements: true
});

const query = util.promisify(connection.query).bind(connection);

async function exportarConsultaParaCSV() {
  try {
    const results = await query(`
      SELECT Aluno.Nome, Avaliacao.Nota, Avaliacao.Descricao
      FROM Aluno
      JOIN Avaliacao ON Aluno.ID_Aluno = Avaliacao.ID_Aluno
    `);

    const csvData = results.map(row => Object.values(row).join(',')).join('\n');
    fs.writeFileSync('consulta_exportada.csv', csvData);
    console.log('Consulta exportada para consulta_exportada.csv com sucesso.');
  } catch (err) {
    console.error('Erro na consulta ou exportação: ', err);
  } finally {
    connection.end();
  }
}

exportarConsultaParaCSV();