const { Router } = require('express')
const router = Router()
const {getGameAndBet, getBetClassificationByGroup, getGameAndBetByPhase, getGameAndBetFinal}= require('../controllers/index')
const config = require('../config/config')
const validar = require('../midleware/validaciones')


// Ejemplo para el envio de datos (borrar cuando sea necesario)
// router.get('/',(req,res)=> res.render('index',{message:"Radiohead Home", name:"Maolink"}) )
router.get('/', (req, res) => res.render('index'))

router.get('/about', (req, res) => res.render('about'))

router.get('/signup', (req, res) => res.render('user/signup'))

router.get('/routegames', validar.isAuth, async (req, res) => {
  res.render('games')
})

router.get('/groups/:g', validar.isAuth, async (req, res) => { 
const dataBet=await getGameAndBet(config.phaseInitial,req.params.g,req.user.id)
const dataClassification = await getBetClassificationByGroup(req.params.g,req.user.id)
res.render('games',{dataBet, dataClassification})
})

router.get('/eighth', validar.isAuth, async (req, res) => {
  const dataBet =await getGameAndBetByPhase(config.phaseEighth, config.gamesEighth,req.user.id)
   res.render('games-by-phase', {dataBet})
})

router.get('/fourth', validar.isAuth, async (req,res)=>{
  const dataBet =await getGameAndBetByPhase(config.phaseFourth, config.gamesFourth,req.user.id)
  res.render('games-by-phase', {dataBet})
})

router.get('/semi', validar.isAuth, async (req,res)=>{
  const dataBet =await getGameAndBetByPhase(config.phaseSemiFinals, config.gamesSemi,req.user.id)
  res.render('games-by-phase',{dataBet})
})

router.get('/finals', validar.isAuth, async (req,res)=>{
  const dataBet = await getGameAndBetFinal(config.phaseFinal, config.finalStruct, req.user.id)
  const dataClassification = await getBetClassificationByGroup("FINAL",req.user.id)
  res.render('games-by-phase', {dataBet, dataClassification})
})









router.get('/profile', validar.isAuth, async (req, res) => {
  res.render('user/profile')
})

router.get('/password', validar.isAuth, async (req, res) => {
  res.render('user/password')
})


router.get('/admin/users', validar.isAuth, validar.isAdmin, async (req, res) => {
  res.render('admin/users')
})

router.get('/admin/pass-restore', validar.isAuth, validar.isAdmin, async (req, res) => {
  res.render('admin/pass-restore')
})



module.exports = router
