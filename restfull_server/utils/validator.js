module.exports = {
    //util que validata parametros da requisicao
    //tendo como parametros app pra retornar as infos, req para validar alguns campos e res pra retornar resposta
    user:(app, req, res) =>{
        req.assert('_name', 'O nome é obrigatório.').notEmpty(); //verifica se está vazio
        req.assert('_e-mail', 'O e-mail está inválido.').notEmpty().isEmail(); //verifica email valido e vazio

        let errors = req.validationErrors();
        if(errors){
            //chama utils error que só mostra erros
            app.utils.error.send(errors, req, res);
            return false; //pra não inserir registro
        }else{
            return true;
        }
    }

};