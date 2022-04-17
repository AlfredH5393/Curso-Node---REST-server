const path = require('path')
const fs = require('fs')
const { response, request} = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { GenericResponses } = require('../utils');
const CONSTANTS = require('../constants')
const {uploadFiles, getModelByIdCollecion} = require('../helpers')
const {User, Product} = require('../models')


const loadFilesImages = async (req = request, res = response) =>{
   
    try{
        let resUploadFile = await uploadFiles(req.files,'images',CONSTANTS.imagesExtension);
        res.status(resUploadFile.statusCode).json(resUploadFile);
        
    }catch(errUploadFile){
        res.status(errUploadFile.statusCode).json(errUploadFile);
    }
  
    
}

const loadFilesOffice = async (req = request, res = response) =>{
   
    try{
        let resUploadFile = await uploadFiles(req.files,'office-documents',CONSTANTS.docsExtensions);
        res.status(resUploadFile.statusCode).json(resUploadFile);
        
    }catch(errUploadFile){
        res.status(errUploadFile.statusCode).json(errUploadFile);
    }
  
}

const updateImages = async (req = request, res = response) =>{
    const {coleccion, id} = req.params;
    let model;
    let resUploadFile;
    try {
      model = await getModelByIdCollecion(coleccion, id);
    } catch (error) {
        return res.status(error.statusCode).json(error);
    }

    if(model.img){
        const pathCurrentImg = path.join(__dirname,'../uploads/',coleccion,model.img);
        if(fs.existsSync(pathCurrentImg)){
            fs.unlinkSync(pathCurrentImg)
        }
    }

    try{
        resUploadFile = await uploadFiles(req.files,coleccion,CONSTANTS.imagesExtension);
        model.img = resUploadFile.body.arrSuccess[0].file;
        await model.save();
        res.status(200).json(GenericResponses.responseWithData("Imagen actualizada correctamente",model,200,[],0));
    }catch(errUploadFile){
        return res.status(errUploadFile.statusCode).json(errUploadFile);
    }

}

const updateImagesCloundinary = async (req = request, res = response) =>{
    const {coleccion, id} = req.params;
    let model;
    let resUploadFile;
    try {
      model = await getModelByIdCollecion(coleccion, id);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }

    if(model.img){
        const nombreArr = model.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    try{
        const { tempFilePath } = req.files.files
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        model.img = secure_url;
        await model.save();
        res.status(200).json(GenericResponses.responseWithData("Imagen actualizada correctamente",model,200,[],0));
    }catch(err){
        return res.status(500).json(err);
    }

}

const loadImages = async (req = request, res = response) =>{
    const {coleccion, id} = req.params;
    let model;
    const placerHolderImage = path.join(__dirname, '../assets/default-placeholder.png');

    try {
        model = await getModelByIdCollecion(coleccion, id);
    }catch (error) {
        return res.sendFile(placerHolderImage)
    }

    if(model.img){
        const pathCurrentImg = path.join(__dirname,'../uploads/',coleccion,model.img);
        if(fs.existsSync(pathCurrentImg)){
            return res.sendFile(pathCurrentImg);
        }
        return res.sendFile(placerHolderImage);
    }
    res.sendFile(placerHolderImage)
}

const loadImagesCloundinary = async (req = request, res = response) =>{
    const {coleccion, id} = req.params;
    let model;
    const placerHolderImage = path.join(__dirname, '../assets/default-placeholder.png');

    try {
        model = await getModelByIdCollecion(coleccion, id);
    }catch (error) {
        return res.sendFile(placerHolderImage)
    }

    if(model.img){
        return res.send(model.img);
    }   
    
    res.send(placerHolderImage)
}

module.exports = {
    loadFilesImages,
    loadFilesOffice,
    updateImages,
    updateImagesCloundinary,
    loadImagesCloundinary,
    loadImages,
}