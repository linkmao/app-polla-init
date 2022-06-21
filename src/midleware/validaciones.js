const jwt= require ('jsonwebtoken')
const  config =require( '../config')
const User = require ('../models/User')


 const verifyToken = async (req,res,next)=>{
    const token= req.headers["x-access-token"]
    if (!token) return res.status(403).json({message:'Token no encontrado'})
    const decoded= jwt.verify(token, config.secretword)  // Al decodificar obtiene el id del usuario identificado
    req.userId = decoded.id  // Es importante guardar este dato en el req, para que los demás midlewares puedan acceder a ese valor desde req
    const user=await User.findById(req.userId, {password:0})  //{password:0 }- es para que el retorno del suaurio no tenga la contraseña
    if (!user) return res.status(404).json({message:'Usuario no existe'})
    next()
}

const isAdmin = async (req,res,next)=>{
    const user = await User.findById(req.userId)
    console.log(user.role)
    if (user.role!="admin")
    return res.status(403).json({message:'No tienes privilegios de administarador para la operacion'})
    next()
}

// midleware que se encarga de validar si el correo que ingresan ya existe
const validityEmail = async (req,res,next)=>{
    const email = await User.findOne({email:req.body.email})
    if (email) return res.status(400).json({message:'El correo ya existe'})
    next()
}

module.exports={verifyToken, isAdmin, validityEmail}