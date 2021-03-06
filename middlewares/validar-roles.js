const { request, response } = require('express');
const GenericResponse = require('../utils/GenericResponses');

const isRolAdmin = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json(GenericResponse.responseWithData("Se quiere verificar el rol sin validar el token primero",{},500,[],0))
    }

    const {rol, name } = req.usuario;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json(GenericResponse.responseWithData(`${name} no es administrador - No puede realizar esta accion`,{},401,[],0))
    }

    next();
}

const hasRole = (...roles ) => {
    return (req = request, res = response, next) =>{

        if(!req.usuario){
            return res.status(500).json(GenericResponse.responseWithData("Se quiere verificar el rol sin validar el token primero",{},500,[],0))
        }

        if(!roles.includes( req.usuario.rol ))
        {
            return res.status(401).json(GenericResponse.responseWithData(`El servicio requiere uno de estos roles ${roles}`,{},500,[],0))
        }

        next();
    }
}

module.exports = {
    isRolAdmin,
    hasRole
}