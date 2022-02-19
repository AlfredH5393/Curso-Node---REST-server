const mongoose = require('mongoose');

const dbConnection = async ( ) => {
    try {

        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },(err, res) => {
            if (err) throw err;
            console.log('Base de datos ONLINE');
        });

        

    } catch ( err ) {
        console.error( err );
        throw new Error( 'Erro a la hora de inciar la base de datos' )
    }
    

}

module.exports = {
    dbConnection
}