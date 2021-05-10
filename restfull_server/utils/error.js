module.exports= {
    //criar uma function pra trazer possiveis erros de execução
    //com código 400 por padrão
    send: (err, req, res, code=400)=>{
        console.log(`error: ${err}`);
        res.status(code).json({
            error:err
        });
    }
};