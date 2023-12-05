const mysql = require('mysql');
const util = require('util');
/*Utilizar transação nos INSERTS - PONTO ABORDADO NESTE ARQUIVO*/
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "bd",
    multipleStatements: true
  });

const query = util.promisify(connection.query).bind(connection);

async function inserirDadosAvaliacao() {
  try {
    await query('START TRANSACTION');

    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (8.5, 'Prova de Matemática', '2023-06-15', 1, 101)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (7.0, 'Trabalho de História', '2023-06-22', 2, 102)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (9.0, 'Prova de Matemática', '2023-06-18', 3, 103)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (7.5, 'Trabalho de História', '2023-06-21', 4, 102)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (9.5, 'Prova de Matemática', '2023-06-14', 5, 101)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (10.0, 'Trabalho de História', '2023-06-23', 6, 103)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (6.5, 'Prova de Matemática', '2023-06-19', 7, 102)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (5.0, 'Trabalho de História', '2023-06-20', 8, 102)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (7.5, 'Prova de Matemática', '2023-06-16', 9, 101)");
    await query("INSERT INTO Avaliacao (Nota, Descricao, Data, ID_Aluno, ID_Turma) VALUES (7.0, 'Trabalho de História', '2023-06-10', 10, 102)");

    await query('COMMIT');
    console.log('Dados de Avaliacao inseridos com sucesso.');
  } catch (err) {
    await query('ROLLBACK');
    console.error('Falha ao inserir dados em Avaliacao: ', err);
  } finally {
    connection.end();
  }
}

inserirDadosAvaliacao();