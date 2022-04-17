const validaCampos = require('./validar-campos');
const validaRoles = require('./validar-roles');
const validaJTW  = require('./validate-jwt');
const validArchivos = require('./validar-archivo');
module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJTW,
    ...validArchivos
}