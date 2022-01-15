const {  response, request } = require('express');

const usersGet =  (req = request, res = response) => {
    const { q, nombre, apikey, page = 1, limit = 10  }= req.query;
    res.status(400).json ({ 
        message: 'Helo world - GET - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usersPost = (req, res = response) => {
    const body = req.body;

    res.status(200).json ({ 
        message: 'Helo world - POST - controlador',
        body
    })
}

const usersPut = (req, res = response) => {
    const id = req.params.id;
    res.status(200).json ({ 
        message: 'Helo world - PUT - controlador',
        id
    })
}

const usersPatch = (req, res = response) => {
    res.status(200).json ({ 
        message: 'Helo world - PATCH - controlador'
    })
}

const usersDelete = (req, res = response) => {
    res.status(200).json ({ 
        message: 'Helo world - PATCH - controlador'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}