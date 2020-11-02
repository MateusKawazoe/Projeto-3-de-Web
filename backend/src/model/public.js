const { Schema, model } = require('mongoose')
const { type } = require('os')

const publicSchema = new Schema({
    title: type = String,
    owner: {
        photo: type = String,
        username: type = String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    data: {
        url: type = String,
        _id: type = String,
        required: true
    },
    timestamps: true
})

module.exports = model('public',publicSchema)