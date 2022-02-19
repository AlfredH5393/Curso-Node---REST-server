const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async (rol = '') => {
    const rolExist = await Role.findOne({ name: rol });
    if (!rolExist) {
        throw new Error(`El rol ${rol} no esta registrado en BD`);
    }
}

const isEmailExistDB = async ( email = '') => {
    const existEmail = await User.findOne({ email });
    if( existEmail ){
        throw new Error(`El email ${email} ya existe en BD`)
    }
}

const isUserExistById = async ( id ) => {
    const existUser = await User.findById(id);
    if( !existUser ){
        throw new Error(`El ID usuario ${id} no existe en BD`)
    }
}

module.exports = {
    isRoleValid,
    isEmailExistDB,
    isUserExistById
}