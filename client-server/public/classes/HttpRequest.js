class HttpRequest{

    static get(url, params = {}){
        //get chama o metodo request e retorna a promessa
        return HttpRequest.request('GET', url, params);
    }

    
    static delete(url, params = {}){
        
        return HttpRequest.request('DELETE', url, params);
    }

    
    static put(url, params = {}){
        
        return HttpRequest.request('PUT', url, params);
    }

    
    static post(url, params = {}){
        
        return HttpRequest.request('POST', url, params);
    }
    
    static request(method, url, params = {}){
        //criar a promessa de retorno do then
        return new Promise((resolve, reject) =>{
            //fazer a aplicação consumir um Ajax
            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);

            //podemos passar reject nesta situação do ajax
            ajax.onerror = event =>{
                reject(e);
            };

            ajax.onload = event =>{
                let obj = {};

                //circundar com try-catch caso o JSON venha falhado
                try{
                    obj = JSON.parse(ajax.responseText);
                }catch(e){
                    //se der erro, passamos o reject
                    reject(e);
                    console.error(e);
                }
                //uma vez que teve sucesso passamos o resolve
                resolve(obj);
            };
            //passar o Header pra dizer o conteudo enviado
            ajax.setRequestHeader('Content-Type', 'application/json');
            //chama essa solicitação
            ajax.send(JSON.stringify(params));

        });
    }

}