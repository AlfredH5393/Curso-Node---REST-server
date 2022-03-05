const {request, response } = require('express');
const bcryptjs = require('bcryptjs');
const GenericFunctions = require('../utils/GenericFunctions');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const login = async ( req = request, res = response) =>{
    const {email, password} = req.body;
    try{
        //Verificar si el email existe 
        const user = await User.findOne({ email });
        console.log('user:', user);
        if(!user){
            return res.status(400).json(GenericFunctions.genericResponse("Usuario / Password no son correcto - Correo ",{},400,[],0));
        }

        //Si el usuario esta activo
        if(!user.status){
            return res.status(400).json(GenericFunctions.genericResponse("Usuario / Password no son correcto - estado: false",{},400,[],0));
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json(GenericFunctions.genericResponse("Usuario / Password no son correcto - Password",{},400,[],0));
        }

        const token = await generarJWT(user._id)

        res.status(200).json(GenericFunctions.genericResponse("OK",{user, token},200,[],0));
    }catch(e){
       return res.status(500).json(GenericFunctions.genericResponse("Algo salio mal, contacte al adminstrador "+ e,{},500,[],0));
    }
}

module.exports = {
    login
}