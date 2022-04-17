

const validExtensionExpresion = (extension = '', extensionsValids = ['']) => {
    return extensionsValids.includes(extension);
 }
 
 const getExtension =  (fileName = "") => {
     let cuteName = fileName.split('.');
     return cuteName[cuteName.length - 1];
 }
 
 const validVariusFilesExtension = (files, extensionsValids = ['']) => {
     let errorsTypeFiles = 0;
     for (const file of files) {
         if(!validExtensionExpresion(getExtension(file.name), extensionsValids)){
             errorsTypeFiles++;
         }
     }
 
     return errorsTypeFiles;
 }
 
 const moveFile =  (path, file,newNameFile) =>{
     return new Promise((resolve,reject) =>{
         file.mv( path, (err)=>{
             let result = {};
             if(err){
                 result.msj = err;
                 result.isError = true;
                 result.file = newNameFile;    
                 resolve(result);
                 return;
             }
             result.msj = "OK";
             result.isError = false;
             result.file = newNameFile;    
             resolve(result);
         })
     })
 }
 

module.exports = {
    validExtensionExpresion,
    getExtension,
    moveFile,
    validVariusFilesExtension
};