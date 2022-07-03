const {Schema, model}= require('mongoose')

const FinalistsSchema= new Schema({
    firstTeam:{type:String, required:true},
    secondTeam:{type:String, required:true},
    thirdTeam:{type:String, required:true},
    fourthTeam:{type:String, required:true},
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

module.exports = model('Finalist', FinalistsSchema)