const {  response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const GenericFunctions = require('../utils/GenericFunctions');


const usersGet =  async (req = request, res = response) => {
    const { page = 1, limit = 5, skip = 5  }= req.query;
    const filter = {status: true}
    const [users, total] = await Promise.all([
        User.find(filter).limit(Number(limit)).skip(Number(skip)),
        User.countDocuments(filter)
    ])
    res.status(200).json (GenericFunctions.genericResponse("success",users,200,[],total))
}

const usersPost = async (req, res = response) => { 
    //Se obtienes los datos que se envian en el request
    const { name, email, password, rol } = req.body;

    //Se crea la instancia del objeto User
    const user = new User( { name, email, password, rol } );
    
    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync( password, salt );

    //Se graba en base de datos 
    await user.save();

    res.status(200).json (GenericFunctions.genericResponse("success",user,200,[],0))
}

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password, google, email, ...user }  = req.body;

    //Validar contra base de datos datos
    if(password){
        const salt = bcryptjs.genSaltSync(10)
        user.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await User.findByIdAndUpdate(id, user)
    res.status(200).json (GenericFunctions.genericResponse("Registro actualizado correctamente", usuario,200,[],0));
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    const query = { status: false }
    const authUser = req.usuario;
    //Eliminacion fisica
    //const response  = await User.findByIdAndDelete(id);
    //Eliminacion Logica 
    const response = await User.findByIdAndUpdate(id, query);
    res.status(200).json (GenericFunctions.genericResponse("Registro eliminado correctamente",{ response },200,[],0));
}

const usersPatch = (req, res = response) => {
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