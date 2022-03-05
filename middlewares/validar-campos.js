const { validationResult } = require('express-validator');
const { response, request } = require('express')

const GenericFunctions = require('../utils/GenericFunctions');

const validarCampos = (req = request, res = response, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json(GenericFunctions.genericResponse('', {}, 400, errors.errors,0))
    }
    
    //Es una funcion que hace el paso al siguiente middlewares en caso de exista, si no ya se pasa al controlador
    next();
}

module.exports = {
    validarCampos
}