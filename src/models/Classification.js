const {Schema, model}= require('mongoose')

const ClassificationSchema= new Schema({
    group: {type:String, required:true},
    first:{type:String, required:true},
    second:{type:String, required:true},
    third:{type:String},
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

module.exports = model('Classification', ClassificationSchema)