// Modelo de apuestas
const {Schema, model}= require('mongoose')

const betGameSchema = new Schema({
idGame:{type:String, required:true},
idUser:{type:String, required:true},
phase:{type:Number, required:true},
localScore:{type:Number, required:true},
visitScore:{type:Number, required:true},
analogScore:{type:String, required:true},
earnedScore:{type:String, default:0},
created_at:{type:Date, default:Date.now}
},
{versionKey:false})

module.exports = model('BetGame', betGameSchema)