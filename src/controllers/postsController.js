import { getAllPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  try {
    // Chama a função do modelo para obter todos os posts
    const posts = await getAllPosts();
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
  } catch (error) {
    // Caso ocorra um erro, registra no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    // Chama a função do modelo para criar um novo post
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta JSON com status 201 (Criado)
    res.status(201).json(postCriado);
  } catch (error) {
    // Caso ocorra um erro, registra no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

// Função assíncrona para fazer upload de imagem e criar um novo post
export async function uploadImagem(req, res) {
  const novoPost = req.body;
  try {
    // Cria um novo post
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome do arquivo da imagem
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta JSON com status 201 (Criado)
    res.status(201).json(postCriado);
  } catch (error) {
    // Caso ocorra um erro, registra no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    // Chama a função do modelo para criar um novo post
    const postCriado = await atualizarPost(id, post);
    // Envia o post criado como resposta JSON com status 201 (Criado)
    res.status(201).json(postCriado);
  } catch (error) {
    // Caso ocorra um erro, registra no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}