const { Router } = require('express')
const router = Router()
const {getGameAndBet, getBetClassificationByGroup, getGameAndBetByPhase, getGameAndBetFinal,   getPointGameGroup, getPointGamePhase, getPointClassification, getPointGamePhantom, sumTotalPoint, totalPointByGameGroups, totalPointByGamePhases,totalPointByClassification, totalPointByClassificationFinal, totalPointPhaseOne, totalPointPhaseTwo, greatTotal}= require('../controllers/index')
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
const dataPointGames=await getPointGameGroup(req.params.g, req.user.id)
const dataPointClass=await getPointClassification(req.params.g, req.user.id)
const total=sumTotalPoint([dataPointGames,dataPointClass]) 
const dataPoint=[{dataPointGames,dataPointClass,dataFlags:{renderGroup:true,  renderClassification:true, total}}]
res.render('games',{dataBet, dataClassification,dataPoint})
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
  const dataPointGamePhantom = await getPointGamePhantom(65, req.user.id)
  const total=sumTotalPoint([dataPointGames,dataPointClass,dataPointGamePhantom]) 
  const dataPoint=[{dataPointGames,dataPointClass,dataPointGamePhantom, dataFlags:{renderClassification:true,renderEqualTeam:true, renderGamePhantom:true, renderPhase:true, phase:"Final",total}}]
  res.render('games-by-phase', {dataBet, dataClassification, dataPoint})
})

router.get('/detailpoints', validar.isAuth, async (req,res)=>{
//IMPORTANTE, NO BORRAR ESTE CODIGO, LO DEBO ANALIZA PUES NO FUNCIONA AL NO HACER LA SUMA, TIENE QUE VER CON EL CONTEXTO EL ESCOPE DE LA VAIABLE, QUE LIOOOOOOOO
  // const groups= ["A", "B", "C", "D", "E", "F", "G","H" ]
  // let totalByGameGroups=0
  // groups.forEach(async g=>{
  // totalByGameGroups+=(await getPointGameGroup(g, req.user.id)).total
  // })
  // console.log(totalByGameGroups)
  // res.render('detail-points')

// INFO PARA LA PUNTIACION GENERAL  
const totalByGameGroups= await totalPointByGameGroups(req.user.id)
const totalByClassification = await totalPointByClassification(req.user.id)
const totalPointGroups=await totalPointPhaseOne(req.user.id)
const totalByGamePhases =await totalPointByGamePhases(req.user.id)
const totalByClassificationFinal = await totalPointByClassificationFinal(req.user.id)
const totalPointPhases=await totalPointPhaseTwo(req.user.id)
const greatTotalPoint=await greatTotal(req.user.id)
const dataPoint =[{totalByGameGroups,totalByClassification,totalPointGroups,totalByGamePhases,totalByClassificationFinal,totalPointPhases,greatTotalPoint}]


// INFO PARA LA TABLA DE PUNTAJE POR JUEGOS
const dataTableGame=[]
let dataTablePoint=null
let dataFlags={}
dataTablePoint= await getPointGameGroup("A", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("B", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("C", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("D", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("E", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("F", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("G", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint= await getPointGameGroup("H", req.user.id)
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint=await getPointGamePhase(config.phaseEighth, req.user.id)
dataFlags={phase:"Octavos"}
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint=await getPointGamePhase(config.phaseFourth, req.user.id)
dataFlags={phase:"Cuartos", renderLocalEqual:true}
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint=await getPointGamePhase(config.phaseSemiFinals, req.user.id)
dataFlags={phase:"Semifinal", renderLocalEqual:true}
dataTableGame.push({dataTablePoint,dataFlags})
dataTablePoint=await getPointGamePhase(config.phaseFinal, req.user.id)
dataGamePhantom= await getPointGamePhantom(65, req.user.id)
dataTablePoint.total+=dataGamePhantom.total  // Se le suma el puntaje de phantom game
dataFlags={phase:"Final", dataGamePhantom, renderLocalEqual:true}
dataTableGame.push({dataTablePoint,dataFlags})

//INFO PARA LA TABLA DE CLASIFICACIONES
const dataTableClass=[]
dataTablePoint= await getPointClassification("A", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("B", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("C", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("D", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("F", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("G", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("H", req.user.id)
dataFlags={}
dataTableClass.push({dataTablePoint, dataFlags})
dataTablePoint= await getPointClassification("FINAL", req.user.id)
dataFlags={renderFinal:true}
dataTableClass.push({dataTablePoint, dataFlags})

res.render('detail-points',{dataPoint, dataTableGame, dataTableClass})


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
