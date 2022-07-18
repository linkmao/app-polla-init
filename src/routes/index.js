const {Router}=require('express')
const router = Router()
const User= require('../models/User')
const Game=require('../models/Game')
const BetGame= require('../models/Bet-game')
const validar= require('../midleware/validaciones')

// Ejemplo para el envio de datos (borrar cuando sea neecesario)
// router.get('/',(req,res)=> res.render('index',{message:"Radiohead Home", name:"Maolink"}) )
router.get('/',(req,res)=> res.render('index') )
router.get('/about',(req,res)=> res.render('about'))
router.get('/signup',(req,res)=> res.render('user/signup'))


// Despues del logueo en signin, administrado por passport, este proporcina en req.user.id el id del usuario logueado, es entonces este valor que se usa en game para con consultar los juegos ()
router.get('/games',validar.isAuth, async (req,res)=> {
  // console.log("Usuario logueado", req.user.id)
  // const user = await User.findById(req.user.id)
  const games= await BetGame.find({idUser:req.user.id})
  res.render('games',{games})})


  router.get('/groups/:g', validar.isAuth, async(req,res)=>{
      const gameByGroup = await Game.find({analogScore:req.params.g}).lean()
      console.log(gameByGroup)
       res.render('games',{gameByGroup})
  })
  

router.get('/profile',validar.isAuth, async (req,res)=>{
  res.render('user/profile')
})

router.get('/password', validar.isAuth, async(req,res)=>{
  res.render('user/password')
})


router.get('/admin/users', validar.isAuth, validar.isAdmin, async(req,res)=>{
  res.render('admin/users')
})

router.get('/admin/pass-restore', validar.isAuth, validar.isAdmin, async(req,res)=>{
  res.render('admin/pass-restore')
})



module.exports= router
