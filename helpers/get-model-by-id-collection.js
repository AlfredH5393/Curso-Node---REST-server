const { GenericResponses } = require('../utils');
const {User, Product} = require('../models');

const getModelByIdCollecion = (coleccion = "", id)  =>{
    return new Promise(async (resolve, reject) =>{
        let model;
        switch(coleccion){
            case "users":
                model = await User.findById(id);
                if(!model){
                    reject(GenericResponses.responseNoData(`El id No existe en la colleccion ${coleccion}`,400))
                }
                break;
            case "products":
                model = await Product.findById(id)
                if(!model){
                    reject(GenericResponses.responseNoData(`El id No existe en la colleccion ${coleccion}`,400))
                }
                break;
            default:
                reject(GenericResponses.responseNoData("No hay coleccion para realizar acción",500))
        }
        resolve(model);
    })
}

module.exports = {
    getModelByIdCollecion
}