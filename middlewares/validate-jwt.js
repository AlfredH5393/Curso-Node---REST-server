const jwt = require('jsonwebtoken');
const {  response, request } = require('express');
const User = require('../models/user');

const GenericFunctions = require('../utils/GenericFunctions');
                    //Recordar que entrar como referencias req, res 
const validarJTW  =  async (req = request, res = response, next) => {
   const token = req.header('x-token');
   if(!token){
       return res.status(401).json(GenericFunctions.genericResponse("No authorize",{},401,[],0))
   }

   try{
    
    const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
    //Se crear una nueva propiedad 
    const usuario = await User.findById(uid);

    //Verifica si el usuario existe en BD
    if(!usuario){
        return res.status(401).json(GenericFunctions.genericResponse("Token no valido - usuario no existe",{},401,[],0))
    }
    
    //Verificar si el usuario logeado tiene estad en treu
    if(!usuario.status){
        return res.status(401).json(GenericFunctions.genericResponse("Token no valido - usuario con estado eliminado",{},401,[],0))
    }

    req.usuario = usuario;
    next();

   }catch(error){
    return res.status(401).json(GenericFunctions.genericResponse("Token no valido",{},401,[],0))
   }
  
}

module.exports = {
    validarJTW
}