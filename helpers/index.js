const  dbValidator = require('./db-validators');
const  generarJWT = require('./generar-jwt');
const  googleVerify = require('./google-verify');
const  uploadFiles = require('./upload-files');
const  generalValidators = require('./general-validators');
const  getModelByIdCollection = require('./get-model-by-id-collection');
module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...uploadFiles,
    ...generalValidators,
    ...getModelByIdCollection
}