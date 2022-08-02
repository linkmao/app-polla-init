const passport = require('passport')
const User = require ('../models/User')
const Game = require('../models/Game')
const Group = require('../models/Group')
const BetClassification = require('../models/Bet-classification')
const BetGame=require('../models/Bet-game')
const config=require('../config/config')



const signUp = async (req,res)=>{
  const {email, pass, name, lastName, phone}= req.body
  const newUser=new User({email, pass:await User.encryptPass(pass) , name, lastName, phone})
  await newUser.save()

// La siguiente seccion de codigo lo que hace es generar la estructura de la apuesta inicial para el jugador recien logueado, se espera el futuras versiones hacer esta implementacion en un midleware independinete
  
  // CREACION DE LOS DATOS PARA Bet-game
  const games = await Game.find({phase:config.phaseInitial})
  games.forEach( async (e,i)=>{
  const newBetGame=new BetGame({idGame:e._id,idUser:newUser._id, localTeam:e.localTeam, visitTeam:e.visitTeam, localScore:e.localScore, visitScore:e.visitScore, analogScore:e.analogScore})
  await newBetGame.save()
  })
  
  // CREACION DE LOS DATOS PARA Bet-classification
  const groups = await Group.find()
  groups.forEach(async(e,i)=>{
  const newBetClassification = new BetClassification({idUser:newUser._id, group:e.name})
  await newBetClassification.save()
  })

  req.flash('mensajeOk','Registro exitoso. Inicia sesión')
  res.status(200).redirect('/')    // Luego de registrado se redirige a la pnatalla principal para que haga loguin, sin empbargoo luego lo haré oara que inmediatamente ingrese a su app
  
}

// VERSION DE CODIGO CON JWEBTOKEN

// const jwt = require('jsonwebtoken')
// const config = require('../config/config')

// SIGNUOP USANDO LA ESTRATEGIA DEL TOKEN

// const signUp = async (req,res)=>{
//   const {email, pass, name, lastName, phone}= req.body
//   const newUser=new User({email, pass:await User.encryptPass(pass) , name, lastName, phone})
//   await newUser.save()
//   // Luego que se crea el usuario se le entrega un token, de esa manera ya queda logueado
//   const token = jwt.sign({id:newUser._id}, 
//     config.secretword,
//     {expiresIn:config.tokenDuration})  // Se configura para que el token solo dure un dia (puede ser menos)
//     // Retorno el token
//     res.status(200).json({token})
// }


// Signin usando token
// const signIn = async (req, res)=>{
//   const {email, pass}= req.body
//   console.log(email, pass)
//   const userFound= await User.findOne({email})
//   if (!userFound) { 
//    res.status(400).json({message:"Usuario no registrado"})
//   }
//   else {
//     const matchPass = await User.comparePass(pass, userFound.pass)
//     if (matchPass){
//     const token = jwt.sign({id:userFound._id}, 
//     config.secretword,
//     {expiresIn:config.tokenDuration})  // Se configura para que el token solo dure un dia (puede ser menos)
//     // Retorno el token
//     res.status(200).json({token})
//     }
//     else
//     res.status(200).json({message:"Contraseña incorrecta"})
//   }
// }


module.exports =  {signUp}