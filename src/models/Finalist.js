const {Schema, model}= require('mongoose')

const FinalistsSchema= new Schema({
    first:{type:String, required:true},
    second:{type:String, required:true},
    third:{type:String, required:true},
    fourth:{type:String, required:true},
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

module.exports = model('Finalist', FinalistsSchema)