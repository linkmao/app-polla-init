const {Schema, model}= require('mongoose')

const betFinalist = new Schema({
idUser:{type:String, required:true},
first:{type:String,required:true},
second:{type:String,required:true},
third:{type:String,required:true},
fourth:{type:String,required:true},
earnedScore:{type:Number, default:0},
created_at:{type:Date, default:Date.now}
},
{versionKey:false})

module.exports = model('BetFinalist', betFinalist)