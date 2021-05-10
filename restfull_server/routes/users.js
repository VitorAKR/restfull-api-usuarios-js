//se eu quiser armazenar informações da rota
//eh possivel utilizar um BD bem leve
let NeDB = require('nedb');
//instaciar meu BD em variavel
let db = new NeDB({
    filename:'users.db',
    autoload: true
});


//eh definido em server a rota e no arquivo os outros caminhos
module.exports = app =>{
    //chamar app de route pra passar o caminho padrão
    let route = app.route('/users');

    route.get((req, res) =>{

        //apresentar na console url e metodo
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);
                    

        //listar usuarios com find do nedb ordenando de forma ascendente
        db.find({}).sort({name:1}).exec((err, users) => {
            if(err){
                //chamar utils com seus parametros
                app.utils.error.send(err, req, res);
            }else{
                res.statusCode = 200; //retornar o status 
                res.setHeader('Content-Type', 'application/json'); //passar um json com array de users 
                res.json({
                    users
                });
            }
        });
        
    });
    
    route.post((req, res) =>{
        //apresentar na console url e metodo
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);

        //chamar validator.js pra validar campos
        //colocar false pra não computar o registro
        if(!app.utils.validator.user(app, req, res)) return false;

        //para gravar os dados recebidos, eu preciso chamar a inserção do BD
        //metodo insert pede a requisiçao, msg de erro se tiver e o objeto a ser gravado
        db.insert(req.body, (err, user) =>{
            if(err){ //se tiver erro, retorna na console com status 400
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(user);
            }
        });
    });

    //definindo rota pra listar somente 1 usuario
    //*se quiser mudar a rota só precisa trocar o params
    let routeId = app.route('/users/:id');
    routeId.get((req, res) =>{
        //apresentar na console url e metodo
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);
        //usaremos o findOne, para apenas um registro com o ID
        db.findOne({_id:req.params.id}).exec((err, user) =>{
            if(err){
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(user);
            } 
        });
    });

    routeId.put((req, res) =>{
        //apresentar na console url e metodo
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);

        if(!app.utils.validator.user(app, req, res)) return false;

        //usaremos o update(), para alterar campos através do ID da rota
        //passando a req.body do registro, porém apresentando toda a requisicao concatenada com assign
        db.update({_id:req.params.id}, req.body, err =>{
            if(err){
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(Object.assign(req.params, req.body)); //trazer dados atualizados
            } 
        });
    });

    routeId.delete((req, res) =>{
        //apresentar na console url e metodo
        console.log('URL:', req.url);
        console.log('METHOD:', req.method);
        db.remove({_id:req.params.id}, {}, err =>{
            if(err){
                app.utils.error.send(err, req, res);
            }else{
                res.status(200).json(req.params); //trazer o ID pq não temos mais os dados
            } 
        });
    });
};