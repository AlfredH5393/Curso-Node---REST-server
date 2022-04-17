const allowsCollecions = (coleccion = '', collections = ['']) =>{
    if(!collections.includes(coleccion)){
        throw new Error(`La ${ coleccion } no es permitida!, ${ collections }`);
    }
    return true;
}

module.exports ={
    allowsCollecions
}