//pra rotar retornar ao arquivo principal server.js
//preciso fazer o export da rota
module.exports = app =>{
    app.get('/',(req, res) =>{

        //apresentar na console url e metodo
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);
    
        res.statusCode = 200; //retornar o status 
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Olá, Sou o REST API rodando!</h1><p>Fui criado para guardar os dados cadastrados no NeDB e para as rotas.</p>');
    });
};