const mysql = require('mysql');
/*Utilizando linguágem de programa, faça um programa que realiza o CRUD* de pelo
menos 1 entidade do seu Diagrama Entidade Relacionamento - PONTO ABORDADO NESTE ARQUIVO*/
let connection;

const openConnection = async () => {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: 'bd'
    });

    return new Promise((resolve, reject) => {
        connection.connect(function(err) {
            if (err) {
                console.error('Erro ao conectar: ', err);
                reject(err);
                return;
            }
            console.log("Connected!");
            resolve();
        });
    });
};

const executeQuery = async (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.error('Erro ao executar a query: ', err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

const closeConnection = () => {
    return new Promise((resolve, reject) => {
        connection.end(err => {
            if (err) {
                console.error('Erro ao fechar a conexão: ', err);
                reject(err);
                return;
            }
            console.log("Connection closed.");
            resolve();
        });
    });
};

const run = async () => {
    try {
        await openConnection();

        let operacao = 1; /*1 Create, 2 Read, 3 Update, 4 Delete*/

        if (operacao == 1) {
            let sql = `        
                insert into aluno (Nome, Matricula, Curso, Telefone, Endereco, Data_de_nascimento)
                values ('Tiago Farias', 123456, 'CS', '99999999', 'Rua Araraquara 19000', '2010-01-01');
            `;
            await executeQuery(sql);
        } else if (operacao == 2) {
            let sql = `
            select * from aluno where Nome = 'Tiago Farias';
            `;
            const result = await executeQuery(sql);
            console.log('Resultado da consulta: ', result);
        } else if (operacao == 3) {
            let sql = `        
            update aluno set Nome = 'Renan Almeida' where Nome = 'Tiago Farias';
        `
            await executeQuery(sql);
        } else if (operacao == 4) {
            let sql = `
            delete from aluno where Nome = 'Renan Almeida';
        `
            await executeQuery(sql);
        }
    } catch (err) {
        console.error('Erro durante a execução:', err);
    } finally {
        await closeConnection();
    }
};

run();