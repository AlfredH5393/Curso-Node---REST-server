const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name :{
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type : String,
        required: [true, 'El email es obligatorio'],
        unique: true
    }, 
    password: {
        type : String,
        required: [true, 'La constraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }

})

UserSchema.methods.toJSON =  function (){
    const { __v, _id , ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );