const {request, response } = require('express');
const bcryptjs = require('bcryptjs');
const GenericFunctions = require('../utils/GenericFunctions');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async (req = request, res= response) => {
    const { id_token } = req.body;
    try {
        const {name, email, picture} = await googleVerify(id_token);
        let usuario = await User.findOne({email});
        if(!usuario) {
            const data  ={
                name,
                email,
                password: ':P',
                img:picture,
                google: true,
                rol: "USER_ROLE",
                status: true
            }
            usuario = new User(data);
            await usuario.save();
        }

        if(!usuario.status) {
            return res.status(401).json(GenericFunctions.genericResponse("Hable con el administrador, usuario bloqueado",{},401,[],0))
        }

        const token = await generarJWT(usuario._id);
        
        res.status(200).json(GenericFunctions.genericResponse("OK",{usuario, token},200,[],0));
    } catch (error) {
       return res.status(500).json(GenericFunctions.genericResponse("El token no se pudo verificar "+ error,{},500,[],0));
    }
    
}

module.exports = {
    login,
    googleSignIn
}