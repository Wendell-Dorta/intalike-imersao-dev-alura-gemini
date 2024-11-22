import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// **Conecta ao banco de dados:**
// Esta linha estabelece a conexão com o banco de dados MongoDB utilizando a string de conexão 
// armazenada na variável de ambiente STRING_CONEXAO. A função conectarAoBanco, definida em 
// config/dbConfig.js, provavelmente contém a lógica para criar a conexão.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// **Função para obter todos os posts:**
// Esta função assíncrona é responsável por buscar todos os posts armazenados no banco de dados.
export async function getAllPosts() {
    // **Seleciona o banco de dados e a coleção:**
    // Seleciona o banco de dados "imersao-instabytes" e a coleção "posts" dentro desse banco de dados. 
    // Essas são as entidades onde os dados dos posts estão armazenados.
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    // **Busca todos os posts:**
    // Executa uma consulta para encontrar todos os documentos (posts) dentro da coleção especificada.
    // O método toArray() transforma o cursor de resultados em um array de objetos JavaScript.
    return colecao.find().toArray();
}

// **Função para criar um novo post:**
// Esta função assíncrona é responsável por inserir um novo post no banco de dados.
export async function criarPost(novoPost) {
    // **Seleciona o banco de dados e a coleção:**
    // Similar à função getAllPosts, seleciona o banco de dados e a coleção onde os posts serão inseridos.
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    // **Insere um novo post:**
    // Insere um novo documento (o novo post) na coleção especificada. O método insertOne() retorna um objeto 
    // que contém informações sobre a operação de inserção, como o ID do documento inserido.
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:post});
}