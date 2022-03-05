
const validaCampos = require('./validar-campos');
const validaRoles = require('./validar-roles');
const validaJTW  = require('./validate-jwt');

module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJTW
}