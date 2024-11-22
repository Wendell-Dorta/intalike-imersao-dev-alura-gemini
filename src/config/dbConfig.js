import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
  // Cria um cliente MongoDB usando a string de conexão fornecida
  const client = new MongoClient(stringConexao);

  try {
    console.log('Conectando ao cluster do banco de dados...');
    // Tenta estabelecer a conexão com o banco de dados
    await client.connect();
    console.log('Conectado ao Mongo Atlas com sucesso!');

    // Retorna o cliente para que outras partes do código possam utilizá-lo
    return client;
  } catch (error) {
    // Caso ocorra algum erro durante a conexão, exibe a mensagem de erro e encerra a aplicação
    console.error('Falha na conexão com o banco de dados:', error);
    process.exit(1); // Encerra a aplicação com código de saída 1 indicando erro
  }
}