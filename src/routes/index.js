const { Router } = require('express')
const router = Router()
const {getGameAndBet, getBetClassificationByGroup, getGameAndBetByPhase, getGameAndBetFinal,   getPointGameGroup, getPointGamePhase, getPointClassification, getPointGamePhantom, sumTotalPoint, totalPointByGameGroups, totalPointByGamePhases,totalPointByClassification, totalPointByClassificationFinal, totalPointPhaseOne, totalPointPhaseTwo, greatTotal, getAllGamersPoint, dataForGeneralPoint, dataForTableGame, dataForTableClass}= require('../controllers/index')
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
const dataBet=await getGameAndBet(req.params.g,req.user.id) //config.phaseInitial,
const dataClassification = await getBetClassificationByGroup(req.params.g,req.user.id)
const dataPointGames=await getPointGameGroup(req.params.g, req.user.id)
const dataPointClass=await getPointClassification(req.params.g, req.user.id)
const total= sumTotalPoint([dataPointGames,dataPointClass]) 
const dataPoint=[{dataPointGames, dataFlags:{renderGroup:true,  renderClassification:true, total}}]
res.render('games', {dataBet, dataClassification, dataPoint})
})

router.get('/eighth', validar.isAuth, async (req, res) => {
  const dataBet =await getGameAndBetByPhase(config.phaseEighth, config.gamesEighth,req.user.id)
  const dataPointGames=await getPointGamePhase(config.phaseEighth, req.user.id)
  const total=sumTotalPoint([dataPointGames]) 
  const dataPoint=[{dataPointGames, dataFlags:{renderEqualTeam:true, renderPhase:true, phase:"Octavos",  total}}]
   res.render('games-by-phase', {dataBet, dataPoint})
})

router.get('/fourth', validar.isAuth, async (req,res)=>{
  const dataBet =await getGameAndBetByPhase(config.phaseFourth, config.gamesFourth,req.user.id)
  const dataPointGames=await getPointGamePhase(config.phaseFourth, req.user.id)
  const total=sumTotalPoint([dataPointGames]) 
  const dataPoint=[{dataPointGames, dataFlags:{renderEqualTeam:true, renderPhase:true, phase:"Cuartos", total}}]
  res.render('games-by-phase', {dataBet, dataPoint})
})

router.get('/semi', validar.isAuth, async (req,res)=>{
  const dataBet =await getGameAndBetByPhase(config.phaseSemiFinals, config.gamesSemi,req.user.id)
  const dataPointGames=await getPointGamePhase(config.phaseSemiFinals, req.user.id)
  const total=sumTotalPoint([dataPointGames]) 
  const dataPoint=[{dataPointGames, dataFlags:{renderEqualTeam:true, renderPhase:true, phase:"Semifinal",total}}]
  res.render('games-by-phase',{dataBet, dataPoint})
})

router.get('/finals', validar.isAuth, async (req,res)=>{
  const dataBet = await getGameAndBetFinal(config.phaseFinal, config.finalStruct, req.user.id)
  const dataClassification = await getBetClassificationByGroup("FINAL",req.user.id)
  const dataPointGames=await getPointGamePhase(config.phaseFinal, req.user.id)
  const dataPointClass=await getPointClassification("FINAL", req.user.id)
  const dataPointGamePhantom = await getPointGamePhantom(config.gamePhantom, req.user.id)
  const total=sumTotalPoint([dataPointGames,dataPointClass,dataPointGamePhantom]) 
  const dataPoint=[{dataPointGames,dataPointClass,dataPointGamePhantom, dataFlags:{renderClassification:true,renderEqualTeam:true, renderGamePhantom:true, renderPhase:true, phase:"Final",total}}]
  res.render('games-by-phase', {dataBet, dataClassification, dataPoint})
})

router.get('/detailpoints', validar.isAuth, async (req,res)=>{
const dataPoint=await dataForGeneralPoint(req.user.id) // INFO PARA LA PUNTACION GENERAL  
const dataTableGame = await dataForTableGame(req.user.id) // INFO PARA LA TABLA DE PUNTAJE POR JUEGOS
const dataTableClass= await dataForTableClass(req.user.id) //INFO PARA LA TABLA DE CLASIFICACIONES
res.render('detail-points',{dataPoint, dataTableGame, dataTableClass})
})

router.get('/detailpointsgamers', validar.isAuth, async (req,res)=>{
  data = await getAllGamersPoint()
  res.render('detail-points-gamers',{data})
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
