const express = require('express');
const cors = require('cors');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
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