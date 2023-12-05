const mysql = require('mysql');
/*Criar índices nas tabelas mais utilizadas - PONTO ABORDADO NESTE ARQUIVO*/
async function openConnection() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "bd",
    multipleStatements: true
  });

  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        console.error("Erro ao conectar ao banco de dados: ", err);
        reject(err);
      } else {
        console.log("Conexão com o banco de dados estabelecida.");
        resolve(connection);
      }
    });
  });
}

const tabelas = [
  `CREATE TABLE Aluno (
    ID_Aluno INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Matricula VARCHAR(255),
    Curso VARCHAR(255),
    Telefone VARCHAR(255),
    Endereco VARCHAR(255),
    Data_de_nascimento DATE
  );`,
  `CREATE INDEX idx_matricula ON Aluno (Matricula);`, 
  `CREATE TABLE Professor (
    ID_Professor INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Matricula VARCHAR(255),
    Telefone VARCHAR(255),
    Endereco VARCHAR(255)
  );`,
  `CREATE INDEX idx_nome_professor ON Professor (Nome);`,
  `CREATE TABLE Avaliacao (
    ID_Avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    Nota DECIMAL,
    Descricao TEXT,
    Data DATE,
    ID_Aluno INT,
    ID_Turma INT,
    FOREIGN KEY (ID_Aluno) REFERENCES Aluno(ID_Aluno)
  );`,  
  `CREATE TABLE Disciplina (
    ID_Disciplina INT PRIMARY KEY AUTO_INCREMENT,
    Descricao TEXT,
    Carga_horaria INT,
    Nome VARCHAR(255),
    ID_Avaliacao INT,
    FOREIGN KEY (ID_Avaliacao) REFERENCES Avaliacao(ID_Avaliacao)
  );`,  
  `CREATE TABLE Turma (
    ID_Turma INT PRIMARY KEY AUTO_INCREMENT,
    Horario TIME,
    ID_Professor INT,
    ID_Disciplina INT,
    FOREIGN KEY (ID_Professor) REFERENCES Professor(ID_Professor),
    FOREIGN KEY (ID_Disciplina) REFERENCES Disciplina(ID_Disciplina)
  );`,
  /*`ALTER TABLE Avaliacao
   ADD FOREIGN KEY (ID_Turma) REFERENCES Turma(ID_Turma);`,*/ 
  `CREATE TABLE Curso (
    ID_Curso INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255),
    Departamento VARCHAR(255),
    Creditos_Totais INT,
    ID_Professor INT,
    FOREIGN KEY (ID_Professor) REFERENCES Professor(ID_Professor)
  );`,  
  `CREATE TABLE Presenca (
    ID_Presenca INT PRIMARY KEY AUTO_INCREMENT,
    Data DATE,
    Descricao TEXT,
    ID_Turma INT,
    ID_Aluno INT,
    FOREIGN KEY (ID_Turma) REFERENCES Turma(ID_Turma),
    FOREIGN KEY (ID_Aluno) REFERENCES Aluno(ID_Aluno)
  );`,  
  `CREATE TABLE Sala_de_Aula (
    ID_Sala INT PRIMARY KEY AUTO_INCREMENT,
    Capacidade INT,
    ID_Turma INT,
    FOREIGN KEY (ID_Turma) REFERENCES Turma(ID_Turma)
  );`,
  `CREATE TABLE Historico_Academico (
    ID_Historico INT PRIMARY KEY AUTO_INCREMENT,
    Media DECIMAL,
    ID_Aluno INT,
    ID_Disciplina INT,
    FOREIGN KEY (ID_Aluno) REFERENCES Aluno(ID_Aluno),
    FOREIGN KEY (ID_Disciplina) REFERENCES Disciplina(ID_Disciplina)
  );`,
  `CREATE TABLE Aluno_Disciplina (
    ID_Aluno INT,
    ID_Disciplina INT,
    FOREIGN KEY (ID_Aluno) REFERENCES Aluno(ID_Aluno),
    FOREIGN KEY (ID_Disciplina) REFERENCES Disciplina(ID_Disciplina)
  );`,
  `CREATE TABLE Aluno_Turma (
    ID_Aluno INT,
    ID_Turma INT,
    FOREIGN KEY (ID_Aluno) REFERENCES Aluno(ID_Aluno),
    FOREIGN KEY (ID_Turma) REFERENCES Turma(ID_Turma)
  );`,
  `CREATE TABLE Curso_Disciplina (
    ID_Curso INT,
    ID_Disciplina INT,
    FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso),
    FOREIGN KEY (ID_Disciplina) REFERENCES Disciplina(ID_Disciplina)
  );`,
  `CREATE TABLE Disciplina_Professor (
    ID_Disciplina INT,
    ID_Professor INT,
    FOREIGN KEY (ID_Disciplina) REFERENCES Disciplina(ID_Disciplina),
    FOREIGN KEY (ID_Professor) REFERENCES Professor(ID_Professor)
  );`
];

async function criarTabelas(connection) {
  for (const script of tabelas) {
    await new Promise((resolve, reject) => {
      connection.query(script, (err, results, fields) => {
        if (err) {
          console.error('Erro ao criar tabela: ', err);
          reject(err);
        } else {
          console.log('Tabela criada com sucesso');
          resolve();
        }
      });
    });
  }
}

async function main() {
  try {
    const connection = await openConnection();
    await criarTabelas(connection);
    connection.end();
  } catch (err) {
    console.error("Falha ao criar tabelas: ", err);
  }
}

main();