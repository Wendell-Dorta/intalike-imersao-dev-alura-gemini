// Importa o módulo express para criar o servidor web
import express from "express";
// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Importa funções controladoras para posts (listar, postar, upload de imagem)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Define as configurações de armazenamento para uploads
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo utilizando o nome original
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer utilizando as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define uma função para configuração de rotas
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Define a rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Define a rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Define a rota POST para upload de imagem (usa o middleware upload.single('imagem') e é tratada pela função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes como módulo padrão
export default routes;