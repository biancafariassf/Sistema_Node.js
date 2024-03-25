const express = require("express");
const exphbs = require('express-handlebars').engine
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Variável para armazenar os dados cadastrados
let dados = [];

// Configuração do Handlebars
app.engine('.handlebars', exphbs({
    extname: '.handlebars',
    defaultLayout: false,
    layoutsDir: path.join(__dirname, 'views/layouts/'),
    partialsDir: path.join(__dirname, 'views/partials/')
}));
app.set('view engine', '.handlebars');

// Rota para renderizar a página de cadastro
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para cadastrar um novo dado
app.post('/', (req, res) => {
    const novoDado = {
        nome: req.body.txtNome,
        telefone: req.body.txtTelefone,
        origem: req.body.txtOrigem,
        dataContato: req.body.txtDataContato,
        observacao: req.body.txtObservacao
    };
    dados.push(novoDado);
    res.redirect('/consultar'); // Redireciona para a página de consulta após o cadastro
});

// Rota para exibir todos os dados cadastrados
app.get('/consultar', (req, res) => {
    res.render('consultar', { dados });
});

// Rota para renderizar a página de atualização com os dados a serem atualizados
app.get('/atualizar/:index', (req, res) => {
    const index = req.params.index;
    const registro = dados[index];
    res.render('atualizar', { index, registro });
});

// Rota para lidar com a atualização dos dados
app.post('/atualizar/:index', (req, res) => {
    const index = req.params.index;
    const novoValor = req.body.novoValor;
    dados[index] = novoValor;
    res.redirect('/consultar'); // Redireciona para a página de consulta após a atualização
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});