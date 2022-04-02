const {res, req} = require('express');
const { User, Category, Product } = require('../models');
const GenericFunctions = require('../utils/GenericFunctions');

/**
 * Obtener todos los productos activos
 * @param {*} req 
 * @param {*} res 
 */
const getProducts = async (req = req, res = res) => { 
    const {page = 1, limit = 5, skip = 5} = req.query;
    const filter = {status: true}
    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
               .limit(Number(limit))
               .skip(Number(skip))
               .populate('user','name').populate('category','name')
    ])
    res.status(200).json (GenericFunctions.genericResponse("success",products,200,[],total))
}

/**
 * Obtener un productoo por ID 
 * @param {*} req 
 * @param {*} res 
 */
const getProduct = async (req = req, res = res) => {   
    const { id } = req.params;
    const product = await Product.findById(id).populate('user','name').populate('category','name');
    res.status(200).json (GenericFunctions.genericResponse("success",product,200,[],1))
}

/**
 * Crear un producto
 * @param {*} req 
 * @param {*} res 
 */
const createProduct = async (req = req, res = res) => {
    const {user, status, ...data} = req.body;
    
    //Generar la data a guardar
    data.user = req.usuario._id;
    data.name = data.name.toUpperCase();
    const product = new Product(data);
    await product.save();
    res.status(201).json(GenericFunctions.genericResponse(
        "Producto guardado exitosamente",{ product },201,[],0
    ));
}

/**
 * Actualizar un producto
 * @param {*} req 
 * @param {*} res 
 */
const updateProduct = async (req = req, res = res) => { 
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user =  req.usuario._id;
    await Product.findByIdAndUpdate( id, data, {new: true} );
    const product = await Product.findById(id).populate('user', 'name');
    res.status(200).json (GenericFunctions.genericResponse("Registro actualizado correctamente", product,200,[],0));
}

/**
 * Eliminar un producto
 * @param {*} req 
 * @param {*} res 
 */
const deleteProduct = async (req = req, res = res) => {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(id, { status: false},{new: true});
    res.status(200).json (GenericFunctions.genericResponse("Registro eliminado correctamente",deleted,200,[],0));
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}