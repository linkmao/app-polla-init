const {Schema, model}= require('mongoose')

const GameSchema= new Schema({
    gameNumber:{type:Number,required:true},
    localTeam: {type:String, required:true},
    visitTeam:{type:String, default:true},
    localScore:{type:Number, default:true},
    visitScore:{type:Number, default:true},
    played:{type:Boolean, default:false},
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

module.exports = model('Game', GameSchema)