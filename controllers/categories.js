const {res, req} = require('express');
const { User, Category } = require('../models');
const GenericResponse = require('../utils/GenericResponses');

//getCategories
const getCategories = async (req = req, res = res) => { 
    const {page = 1, limit = 5, skip = 5} = req.query;
    const filter = {status: true}
    const [total, categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter).limit(Number(limit)).skip(Number(skip)).populate('user','name')
    ])
    res.status(200).json (GenericResponse.responseWithData("success",categories,200,[],total))
}

//getCategory
const getCategory = async (req = req, res = res) => {   
    const { id } = req.params;
    const catagory = await Category.findById(id).populate('user', 'name');
    res.status(200).json (GenericResponse.responseWithData("success",catagory,200,[],1))
}

const createCategory = async (req = req, res = res) => {
    const name = req.body.name.toUpperCase();
    
    //Generar la data a guardar
    const data = {
        name,
        user: req.usuario._id
    }
    const category = new Category(data);
    await category.save();
    
    res.status(201).json(GenericResponse.responseWithData(
        "Categoria guardada exitosamente",{ category },201,[],0
    ));
}

//updateCategory
const updateCategory = async (req = req, res = res) => { 
    const { id } = req.params;
    const { status, user , ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user =  req.usuario._id;
    await Category.findByIdAndUpdate(id,data, {new: true});
    const category = await Category.findById(id).populate('user', 'name');
    res.status(200).json (GenericResponse.responseWithData("Registro actualizado correctamente", category,200,[],0));
}

//deleteCategory - status: false
const deleteCategory = async (req = req, res = res) => {
    const { id } = req.params;
    const deleted = await Category.findByIdAndUpdate(id, { status: false});
    res.status(200).json (GenericResponse.responseWithData("Registro eliminado correctamente",deleted,200,[],0));
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}