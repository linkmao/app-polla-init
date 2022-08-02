const {Schema, model}= require('mongoose')

const GroupSchema= new Schema({
    name:{type:String,required:true },
    team1:{type:String,required:true },
    team2:{type:String,required:true },
    team3:{type:String,required:true },
    team4:{type:String,required:true },
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

module.exports = model('Group', GroupSchema)