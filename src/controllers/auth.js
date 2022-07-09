const User = require ('../models/User.js')
const jwt = require('jsonwebtoken')
const config = require('../config')


const signUp = async (req,res)=>{
  const {email, pass, name, lastName, phone}= req.body
  const newUser=new User({email, pass:await User.encryptPass(pass) , name, lastName, phone})
  await newUser.save()
  // Luego que se crea el usuario se le entrega un token, de esa manera ya queda logueado
  const token = jwt.sign({id:newUser._id}, 
    config.secretword,
    {expiresIn:config.tokenDuration})  // Se configura para que el token solo dure un dia (puede ser menos)
    // Retorno el token
    res.status(200).json({token})
}

const signIn = async (req, res)=>{
  const {email, pass}= req.body
  console.log(email, pass)
  const userFound= await User.findOne({email})
  if (!userFound) { 
   res.status(400).json({message:"Usuario no registrado"})
  }
  else {
    const matchPass = await User.comparePass(pass, userFound.pass)
    if (matchPass){
    const token = jwt.sign({id:userFound._id}, 
    config.secretword,
    {expiresIn:config.tokenDuration})  // Se configura para que el token solo dure un dia (puede ser menos)
    // Retorno el token
    res.status(200).json({token})
    }
    else
    res.status(200).json({message:"Contraseña incorrecta"})
  }
}

module.exports = {signIn, signUp}