const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

let feedbacks = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/feedbacks/enviar', (req, res) => {
  const { nome, comentario } = req.body;
  if (nome && comentario) {
    feedbacks.push({ nome, comentario });
  }
  res.redirect('/feedbacks/lista');
});

app.get('/feedbacks/lista', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'lista.html'));
});

app.post('/feedbacks/remover', (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index) && index >= 0 && index < feedbacks.length) {
    feedbacks.splice(index, 1);
  }
  res.redirect('/feedbacks/lista');
});

app.get('/api/feedbacks', (req, res) => {
  res.json(feedbacks);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
