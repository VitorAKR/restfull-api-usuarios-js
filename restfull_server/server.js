const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//criar uma variavel pro express retornar
let app = express();

//entender a codificação que vier em URL encoded
app.use(bodyParser.urlencoded({ extended: false, limit:'50mb'}));
app.use(bodyParser.json({limit:'50mb'})); //converter o que for enviado em JSON
//Comando: npm install express-validatior@5.3.1--save-exact
app.use(expressValidator()); //validator versão 5.3.1


//invoco o consign e atribuo as rotas e utils ao app
consign().include('routes').include('utils').into(app);


//passar a porta e ip pra variavel server ficar ouvindo
//qnd hospedar verificar outra/usar mesma porta
//com function anonima de callback
app.listen(4000, '127.0.0.1', ()=>{
    console.log('Servidor rodando!');
});