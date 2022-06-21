const {Schema, model}= require('mongoose')
const bcrypt= require('bcryptjs')

const UserSchema= new Schema({
    email:{type:String, required:true, unique:true},
    pass:{type:String, required:true},
    name:{type:String,required:true },
    lastName:{type:String,required:true },
    phone: {type:String, required:true},
    role:{type:String,default:'user'},
    active:{type:Boolean, default:true},
    created_at:{type:Date, default:Date.now}
}, 
{versionKey:false})  // elimina __v el cual es un versionado por defecto de mongoose (por el momento no funciona)

// a continuacion se crean dos "metodos" para UserSchema que permitirá la encriptación y la comparacion de las contraseñas

UserSchema.statics.encryptPass = async (pass)=>{
    const salt = await bcrypt.genSalt(10)  // se crea un salt
    console.log(salt)
    return bcrypt.hash(pass, salt)
    
}

UserSchema.statics.comparePass = async (passIntro, passUser)=>{
    return await bcrypt.compare(passIntro, passUser)
}

module.exports = model('User', UserSchema)