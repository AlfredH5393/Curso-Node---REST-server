const {response, request} = require('express')
const { GenericResponses } = require('../utils');

const validarArchivos = (req = request, res = response, next) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.files){
        return res.status(400).json(GenericResponses.responseWithData("No haya archivos que por subir",{},400,[],0))
    }
    next();
}

module.exports ={
    validarArchivos
}