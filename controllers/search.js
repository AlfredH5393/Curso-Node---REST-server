
const {request, response} = require('express');
const { ObjectId } = require('mongoose').Types;
const GenericResponse = require('../utils/GenericResponses');

const { Category,
        Product,
        User } = require('../models');

const coleccionesPermitids = [
    'users','categories', 'products','roles'
]

const searchUsers = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await User.findById(termino);
       
        return res.status(200).json(  GenericResponse.responseWithData(`OK`, usuario == null ? [] : [ usuario ] ,200,[], usuario == null ? 0 : 1))
    }
    const  regexp = new RegExp(termino, 'i');
    const usuarios = await User.find({
            $or :[ { name: regexp }, { email: regexp } ],
            $and:[ { status: true }]    
    });

    return res.status(200).json(  GenericResponse.responseWithData(`OK`, usuarios == null ? [] : [ usuarios ] ,200,[], usuarios.length))

}

const searchCategory = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const category = await Category.findById(termino);
       
        return res.status(200).json(  GenericResponse.responseWithData(`OK`, category == null ? [] : [ category ] ,200,[], category == null ? 0 : 1))
    }
    const  regexp = new RegExp(termino, 'i');
    const categorias = await Category.find({ name: regexp, status: true  });

    return res.status(200).json(  GenericResponse.responseWithData(`OK`, categorias == null ? [] : [ categorias ] ,200,[], categorias == null ? 0 : categorias.length))
}

const searchProducts = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Product.findById(termino).populate('category','name');
       
        return res.status(200).json(  GenericResponse.responseWithData(`OK`, producto == null ? [] : [ producto ] ,200,[], producto == null ? 0 : 1))
    }
    const  regexp = new RegExp(termino, 'i');
    const productos = await Product.find({
            $or :[ { name: regexp }, { description: regexp } ],
            $and:[ { status: true }, {available: true}]    
    }).populate('category','name');

    return res.status(200).json(  GenericResponse.responseWithData(`OK`, productos == null ? [] : [ productos ] ,200,[], productos.length))

}


const search = async (req = request, res = response) => {
    const {coleccion ,termino}  = req.params;
    if(!coleccionesPermitids.includes( coleccion )){
       return  res.status(400).json( GenericResponse.responseWithData(`La colecciones permitidas son ${coleccionesPermitids}`,{},400,[],0) )
    }

    switch(coleccion){
        case 'users':
                console.log("Entre a buscar usuarios")
                searchUsers(termino, res);
            break;
        case 'categories':
                console.log("Entre a buscar categorias")
                searchCategory(termino, res);
            break;
        case 'products':
                console.log("Entre a buscar productos")
                searchProducts(termino, res);
            break;
        default:
           return  res.status(500).json( GenericResponse.responseWithData(`No hay colecciones para buscar`,{},500,[],0) )
          
    }

}

module.exports = { 
    search 
}