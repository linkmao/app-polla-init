const {Schema, model}= require('mongoose')

const UserSchema= new Schema({
    email:{type:String, required:true, unique:true},
    pass:{type:String, required:true},
    name:{type:String,required:true },
    lastName:{type:String,required:true },
    phone: {type:String, required:true},
    active:{type:Boolean, default:true},
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

module.exports = model('User', UserSchema)