const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Conectar a base de datos 
        this.conectDatabase();

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }

    async conectDatabase(){
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use( cors() );
        
        // Lectura y paseo de Body de
        this.app.use( express.json());

        //Directorio publico
        this.app.use( express.static('public'));
    }

    routes (){
        //Rutas 
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usersPath,require('../routes/users'));


        this.app.get('*', (req, res) => {
            res.status(404).send({
                Error : "Enpoint No encontrado"
            })
        })
    }

    listen() {
        
        this.app.listen(this.port,() => {
            console.log('listening on port ' + this.port)
        })
    }
}

module.exports = Server;