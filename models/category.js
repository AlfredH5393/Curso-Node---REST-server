const { Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
})

CategorySchema.methods.toJSON =  function (){
    const { __v, status,...data} = this.toObject();
    //user.uid = _id;
    return data;
}
module.exports = model('Category',CategorySchema)