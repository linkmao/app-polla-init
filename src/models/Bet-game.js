// Modelo de apuestas
const {Schema, model}= require('mongoose')

const betGameSchema = new Schema({
idGame:{type:String, required:true},
idUser:{type:String, required:true},
// phase:{type:Number, required:true},  CONSIDERO QUE NO ES NECESARIO LA FASE PUES ESTA ESTÁ EN EL GAME
localTeam:{type:String},
visitTeam:{type:String},
localScore:{type:Number, required:true},
visitScore:{type:Number, required:true},
analogScore:{type:String, required:true},
earnedScore:{type:Number, default:0},
created_at:{type:Date, default:Date.now}
},
{versionKey:false})

module.exports = model('BetGame', betGameSchema)