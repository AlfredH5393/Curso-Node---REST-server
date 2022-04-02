const {Role,User,Category, Product } = require('../models')

/**
 * Funcion que valida si el nombre del rol no existe en la colleccion de roles
 * @param {*} rol  nombre del rol
 */
const isRoleValid = async (rol = '') => {
    const rolExist = await Role.findOne({ name: rol });
    if (!rolExist) {
        throw new Error(`El rol ${rol} no esta registrado en BD`);
    }
}

/**
 *  Valida a nivel BD que no exista el email 
 * @param {*} email 
 */
const isEmailExistDB = async ( email = '') => {
    const existEmail = await User.findOne({ email });
    if( existEmail ){
        throw new Error(`El email ${email} ya existe en BD`)
    }
}

/**
 * Comprueba si el usuario existe en DB
 * @param {*} id 
 */
const isUserExistById = async ( id ) => {
    const existUser = await User.findById(id);
    if( !existUser ){
        throw new Error(`El ID usuario ${id} no existe en BD`)
    }
}

/**
 * Verfica si existe el Id de la catergoria antes de realiazar alguna operación CRUD
 * @param {*} id 
 */
const isCategoryExist = async ( id ) => {
    const existCategory = await Category.findById(id);
    if( !existCategory ){
        throw new Error(`El ID de catetoria ${id} no existe en BD`)
    }
}

/**
 * Valida si el nombre de la categoria esta en uso o ya existe en otro registro
 * @param {*} name nombre de la categoria
 */
const existNameCategory = async ( name = '' ) => {
    name = name.toUpperCase();
    const existCategoryByName = await Category.findOne({name})
    if( existCategoryByName ){
        throw new Error(`La categoria ${name} ya existe en BD`) 
    }
}

/**
 * Valida si el nombr existe estaen uso o ya existe en otro registro en la coleccion
 */
const existNameProduct = async ( name = '' ) => {
    const existProductByName = await Product.findOne({name})
    if( existProductByName ){
        throw new Error(`El producto ${name} ya existe en BD`) 
    }
}

/**
 * Verfica si existe el Id del producto antes de realiazar alguna operación CRUD
 * @param {*} id 
 */
 const isProductExist = async ( id ) => {
    const existProduct = await Product.findById(id);
    if( !existProduct ){
        throw new Error(`El ID ${id} no existe en BD`)
    }
}


module.exports = {
    existNameCategory,
    existNameProduct,
    isEmailExistDB,
    isCategoryExist,
    isProductExist,
    isUserExistById,
    isRoleValid,
}