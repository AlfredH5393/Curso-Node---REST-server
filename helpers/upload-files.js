const { v4: uuidv4 } = require('uuid');
const { getExtension, 
        validExtensionExpresion,
        validVariusFilesExtension, 
        moveFile,
        GenericResponses } = require('../utils');
const path = require('path');

const uploadFiles =  ({files}, carpeta = '', extensionsValids = ['']) => {
    return new Promise(async (resolve, reject) => {
        let saveSuccess = 0;
        let saveError = 0;
        let arrSuccess = [];
        let arrErrors = [];
        let body = {};
        let result = {};
    
        if(!Array.isArray(files)) {
            let extension = getExtension(files.name);
            let isValidExtension = validExtensionExpresion(extension,extensionsValids);
            if(!isValidExtension){
                reject(GenericResponses.responseWithData('Este archivo no es valido',{},400,[],0));
                return;
            }
            const tempName = uuidv4() + "." + extension; 
            const uploadPath = path.join(__dirname, '../uploads/',carpeta,"/",tempName);
            let responseMoveFile = await moveFile(uploadPath,files,tempName);
            (responseMoveFile.isError) ? arrErrors.push(responseMoveFile) : arrSuccess.push(responseMoveFile);
           
        }else{
            
            if(validVariusFilesExtension(files,extensionsValids) > 0){
                reject(GenericResponses.responseWithData('Uno o varios archivos su extension no es valida',{},400,[],0));
                return;
            }

            for (const file of files) {
                let extension = getExtension(file.name);
                const tempName = uuidv4() + "." + extension;
                const uploadPath = path.join(__dirname, '../uploads/',carpeta,"/",tempName);
                let responseMoveFile = await moveFile(uploadPath,file,tempName);
                (responseMoveFile.isError) ? arrErrors.push(responseMoveFile) : arrSuccess.push(responseMoveFile);
            }
        }
    
        body.arrSuccess = arrSuccess;
        body.arrErrors = arrErrors;
        resolve(GenericResponses.responseWithData('OK',body,200,[],0));
    })
    
}

module.exports = {
    uploadFiles
}