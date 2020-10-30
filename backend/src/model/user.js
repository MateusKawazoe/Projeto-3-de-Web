const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    foto: type = String,
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('user',userSchema)