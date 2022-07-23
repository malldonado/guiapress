const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

//view engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public')); //files static

//access files the node_modules
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/')); 

//body parser to work with form and formats that are forwarded
app.use(bodyParser.urlencoded({extended: false})); //to accept data the form
app.use(bodyParser.json()); // to accept data format json

//Database
connection // calling the object for be authenticated
    .authenticate()
    .then(() => {
        console.log('Conexao feita com sucesso!');
    }).catch((error) => {
        console.log(error);
    })

app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080, (req, res) => {
    console.log('Servidor rodando');
});