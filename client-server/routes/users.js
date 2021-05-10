var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

//JSON Client (Servidor no localhost:4000)
var client = restify.createJSONClient({
  url: 'http://localhost:4000'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //mudar request e response pra identificar o restify
  client.get('/users', function(err, request, response, obj){
    assert.ifError(err);
    
    //passar pra response do client-server
    res.json(obj);
  });
});
//get passando um Id na rota
router.get('/:id', function(req, res, next) {
  
  client.get(`/users/${req.params.id}`, function(err, request, response, obj){
    assert.ifError(err);

    res.json(obj);
  });
});

//put passando o body com os outros parametros pro update
router.put('/:id', function(req, res, next) {
  
  client.put(`/users/${req.params.id}`, req.body, function(err, request, response, obj){
    assert.ifError(err);

    res.json(obj);
  });
});
//delete
router.delete('/:id', function(req, res, next) {
  //restify usa o metodos apenas com 3 digitos, delete = del
  client.del(`/users/${req.params.id}`, function(err, request, response, obj){
    assert.ifError(err);

    res.json(obj);
  });
});
//post - recebendo na rota principal
router.post('/', function(req, res, next) {
  
  client.post(`/users`, req.body, function(err, request, response, obj){
    assert.ifError(err);

    res.json(obj);
  });
});




module.exports = router;
