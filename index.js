const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
// const bootstrap = require('bootstrap');

//view engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public')); //arquivos estaticos

//body parser para trabalhar com formulatio e formatos que sao encaminhados
app.use(bodyParser.urlencoded({extended: false})); //aceitar dados de formulario
app.use(bodyParser.json()); // aceitar dados formato json

//Database
connection // chamando o objeto e mandado ser authenticado
    .authenticate()
    .then(() => {
        console.log('Conexao feita com sucesso!');
    }).catch((error) => {
        console.log(error);
    })

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080, (req, res) => {
    console.log('Servidor rodando');
});