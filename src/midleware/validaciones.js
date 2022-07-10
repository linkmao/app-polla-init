// const jwt= require ('jsonwebtoken')
// const  config =require( '../config/config')
const User = require ('../models/User')


//VALIDACION USANDO TOKEN, POR EL MOMENTO SE OMITE

//  const verifyToken = async (req,res,next)=>{
//     const token= req.headers["x-access-token"]
//     if (!token) return res.status(403).json({message:'Token no encontrado'})
//     const decoded= jwt.verify(token, config.secretword)  // Al decodificar obtiene el id del usuario identificado
//     req.userId = decoded.id  // Es importante guardar este dato en el req, para que los demás midlewares puedan acceder a ese valor desde req
//     const user=await User.findById(req.userId, {password:0})  //{password:0 }- es para que el retorno del suaurio no tenga la contraseña
//     if (!user) return res.status(404).json({message:'Usuario no existe'})
//     next()
// }



const isAuth = (req,res,next)=>{
    if(req.isAuthenticated()) {return next()}
    res.status(404).redirect('/')
}

//VALIDANDO ADMIN USANDO EL TOKEN, POR EL MOMENTO INUTILIZADO
// const isAdmin = async (req,res,next)=>{
//     const user = await User.findById(req.userId)
//     console.log(user.role)
//     if (user.role!="admin")
//     return res.status(403).json({message:'No tienes privilegios de administarador para la operacion'})
//     next()
// }


const isAdmin =  (req,res,next)=>{
    if (req.user.role!="admin")
    return res.status(403).json({message:'No tienes privilegios de administarador para la operacion'})
    next()
}

// midleware que se encarga de validar si el correo que ingresan ya existe
const validityEmail = async (req,res,next)=>{
    const email = await User.findOne({email:req.body.email})
    if (email) return res.status(400).json({message:'El correo ya existe'})
    next()
}

// Valida que las dos contraseñas sean iguales al momento del registro
const validyPass = (req,res,next)=>{
    const {pass, passVerify}= req.body
    if (pass !== passVerify) return res.status(400).json({message:'Contraseñas no coinciden'})
    next() 
}

module.exports={isAuth,isAdmin, validityEmail, validyPass}