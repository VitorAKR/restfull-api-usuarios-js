class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get photo() {
        return this._photo;
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json){

        for (let name in json){
            
            switch(name){

                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                   if (name.substring(0, 1) === '_') {
                       //garantir que os params tenham _
                    this[name] = json[name];  
                   } 

            }
            

        }

    }

    static getUsersStorage() {

        //return HttpRequest.get('/users');
        return Fetch.get('/users');

        //Antigo 
        /**let users = [];
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }
        return users;**/

    }

    //NeDB já cria um Id
    /**getNewID(){

        let usersID = parseInt(localStorage.getItem("usersID"));

        if (!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

    }**/

    toJSON(){
        //metodo pra conveter os parametros de users em JSON
        let json = {};

        Object.keys(this).forEach(key =>{
            //passar uma chave do array pro json, sem ser undefined
            if(this[key]!== undefined){
                json[key] = this[key];
            }
        });
        //depois de montar, retorna o json
        return json;
    }



    save(){

        return new Promise((resolve, reject) =>{
            //pegar promise do servidor
            let promise;

            //verificar se tem id
            if(this.id){
                //promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());
                promise = Fetch.put(`/users/${this.id}`, this.toJSON());
            }else{
                //senão faz cadastro
                //promise = HttpRequest.post(`/users`, this.toJSON());
                promise = Fetch.post(`/users`, this.toJSON());

            }

            //tratar esta promise
            promise.then(data =>{
                this.loadFromJSON(data);
                resolve(this);

            }).catch(e=>{
                reject(e);
            });
        });


        // --------- forma antiga com UserStorage() --------
        //let users = User.getUsersStorage();
        //if (this.id > 0) {       
        //    users.map(u=>{
        //        if (u._id == this.id) {
        //            Object.assign(u, this);
        //        }
        //        return u;
        //    });
        //} else {
        //    this._id = this.getNewID();
        //    users.push(this);
        //}
        //localStorage.setItem("users", JSON.stringify(users));

    }

    remove(){

        //return HttpRequest.delete(`/users/${this.id}`);
        return Fetch.delete(`/users/${this.id}`);

        //Antigo Remove
        /**let users = User.getUsersStorage();
        users.forEach((userData, index)=>{
            if (this._id == userData._id) {
                users.splice(index, 1);
            }
        });
        localStorage.setItem("users", JSON.stringify(users));**/

    }

}