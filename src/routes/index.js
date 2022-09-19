const { Router } = require('express')
const router = Router()
const Game = require('../models/Game')
const BetGame = require('../models/Bet-game')
const Classification = require('../models/Classification')
const BetClassification = require('../models/Bet-classification')
const Team = require('../models/Team')
const validar = require('../midleware/validaciones')
const config = require('../config/config')

// Ejemplo para el envio de datos (borrar cuando sea necesario)
// router.get('/',(req,res)=> res.render('index',{message:"Radiohead Home", name:"Maolink"}) )
router.get('/', (req, res) => res.render('index'))
router.get('/about', (req, res) => res.render('about'))
router.get('/signup', (req, res) => res.render('user/signup'))



// Despues del logueo en signin, administrado por passport, este proporcina en req.user.id el id del usuario logueado, es entonces este valor que se usa en game para con consultar los juegos ()
//RENDERIZACION DE JUEGOS DE LA PRIMERA ETAPA
router.get('/games', validar.isAuth, async (req, res) => {
  // console.log("Usuario logueado", req.user.id)
  // const user = await User.findById(req.user.id)
  const betGames = await BetGame.find({ idUser: req.user.id }).lean()
  res.render('games', { betGames })
})



router.get('/fourth', validar.isAuth, async (req,res)=>{
// LOGICA PARA CONSEGUIR LA DATA DE LOS NOMBRES DE EQUIPO DE LA FASE ANTERIOR

// Priero guardo en un array los id de los game de la fase anterior (eighth), cada game tiene los id de los equipos realmente clasificados... se consulta en el modelo game, pues la fase eighth lo llena el admon con los equipos realmente clasificado
const teams= await Team.find().lean()
const gamesOrder=[]
const games = await Game.find({gameNumber:config.numberGameFourth}).lean() // Si me trae los game pero no en el orden solicitado, los ordena ascendentemente con respecto a gameNUmber
// Con este pequeño algoritmo LO ORDENA, segun lo necesitado en numberGameFourth
config.numberGameFourth.forEach(e=>{
  gamesOrder.push(games.find(ee=>{if (ee.gameNumber==e) return e }))
})

// Se crea la data con los nombres de los equipos y sus banderas
const dataIni = []
gamesOrder.forEach(e=>{
  const teamOne=teams.find(ee=>{if(e.localTeam==ee._id) return ee})
  const teamTwo=teams.find(ee=>{if(e.visitTeam==ee._id) return ee})
  dataIni.push(teamOne,teamTwo)
})




// LOGICA PARA TRAER LAS APUESTAS EN FIRME DEL USUARIO IDENTIFICADO
// del array gamesOrder, obtengo los id que identifica cada game, y los busco en la base de datos asociadas a las apuestas del usuario con id logueado, para ello traigo la info de los juegos de la fase siguinete, es decir semifinal  y los busco en las respectivas apuesta de los jugadores


const juegosDeSemi=[]
const gamesOfSemi = await Game.find({gameNumber:config.numberGameSemiFinals}).lean() // Si me trae los game pero no en el orden solicitado, los ordena ascendentemente con respecto a numberGameSemiFinals
// Con este pequeño algoritmo LO ORDENA, segun lo necesitado en numberGameSemiFinals
config.numberGameSemiFinals.forEach(e=>{
  juegosDeSemi.push(gamesOfSemi.find(ee=>{if (ee.gameNumber==e) return e }))
})

// Ahora con estos juegos de semifinal, busco las apuestas del id identidficado para renderizarlos

const idOfGameSemi=[]
juegosDeSemi.forEach(e=>{idOfGameSemi.push(e._id)})
const betGames = await BetGame.find({idGame:idOfGameSemi, idUser:req.user.id}).lean()
betGames.forEach(e=>{
  if (e.betLocalTeam=="NO-BET") 
  {
    e.betLocalTeam="Sin apostar"
    e.betVisitTeam="Sin apostar"
    e.localFlag="no-flag.png"
    e.visitFlag="no-flag.png"
    e.localScore=""
    e.visitScore=""
    e.analogScore=""
  }
  else
  {
    e.betLocalName=teams.find(ee=>{if (e.betLocalTeam==ee._id) {
        const nameLocal= ee.name
        // console.log(nameLocal)
        return nameLocal} })
    e.betVisitName=teams.find(ee=>{if (e.betVistTeam==ee._id){
      const nameVisit= ee.name
      return nameVisit}})
    e.localFlag=teams.find(ee=>{if (e.betLocalTeam==ee._id) 
      {const localFlag= ee.flag
       return localFlag }})
    e.visitFlag=teams.find(ee=>{if (e.betVisitTeam==ee._id) {
      const visitFlag= ee.flag
       return visitFlag} })
  }
})
console.log(betGames[0])
// console.log(betGames)
// Metodo ABSOLUTAMENTE CHAPUCERO para hacer los bloques necesarios
data=[]
data.push({team1:dataIni[0],team2:dataIni[1],team3:dataIni[2],team4:dataIni[3], idBet:betGames[0]._id})
data.push({team1:dataIni[4],team2:dataIni[5],team3:dataIni[6],team4:dataIni[7], idBet:betGames[1]._id})
data.push({team1:dataIni[8],team2:dataIni[9],team3:dataIni[10],team4:dataIni[11], idBet:betGames[2]._id})
data.push({team1:dataIni[12],team2:dataIni[13],team3:dataIni[14],team4:dataIni[15], idBet:betGames[3]._id})


  res.render('fourth-games',{data, betGames})
})

router.get('/semifinals', validar.isAuth, async (req,res)=>{
  res.render('semifinals-games')
})

router.get('/finals', validar.isAuth, async (req,res)=>{
  res.render('finals-games')
})

// Despues del logueo en signin, administrado por passport, este proporcina en req.user.id el id del usuario logueado, es entonces este valor que se usa en game para con consultar los juegos ()
// RENDERIACION DE JUEGOS DE LA SEGUNDA ETAPA
router.get('/eighth', validar.isAuth, async (req, res) => {
  const betGames = []
  const allBetGames = await BetGame.find({ idUser: req.user.id }).lean()
  const games = await Game.find({ phase: config.phaseEighth }).lean()
  const teams = await Team.find().lean()

  // lleno betGames, con solo las apuestas correspondientes a la phase octavos
  games.forEach(e => {
    betGames.push(allBetGames.find(ee => {
      if (e._id == ee.idGame) return ee
    }))
  })

  //Ahora coloco en betGame ya depurado los NOMBRES de los equipos, y las FLAG correspondient
  betGames.forEach((e, i) => {
    games.forEach((ee, ii) => {
      if (e.idGame == ee._id) {
        const equipoOne = teams.find(e1 => { if (e1._id == ee.localTeam) return e1 })
        const equipoTwo = teams.find(e2 => { if (e2._id == ee.visitTeam) return e2 })
        e.localTeam = equipoOne.name
        e.localFlag = equipoOne.flag
        e.visitTeam = equipoTwo.name
        e.visitFlag = equipoTwo.flag
      }
    })
    // Si el jugador no ha hecho apuestas por defecto los goles y apuestas son genericos, entonces no mostrar
    {e.localScore==-1 ? e.localScore="" : e.localScore=e.localScore}
    {e.visitScore==-1 ? e.visitScore="" : e.visitScore=e.visitScore}
    {e.analogScore==-1 ? e.analogScore="" : e.analogScore=e.analogScore}  

  })


  
  res.render('eighth-games', { betGames })
})



router.get('/groups/:g', validar.isAuth, async (req, res) => {
  const apuestasJugador = await BetGame.find({ idUser: req.user.id }).lean() // Trae TODAS las apuesta del jugador log
  const juegos = await Game.find().lean()  // Trae todos los juegos
  const equipos = await Team.find().lean() // Trae todos los equipos

  // Se obtienen los game solo del grupo consultadi
  const juegosDelGrupo = []

  juegos.forEach(j => {
    if (j.group == req.params.g) {
      // obtengo nombre y badera del local
      equipos.forEach(e => {
        if (e._id == j.localTeam) {
          j.localTeam = e.name
          j.localFlag = e.flag
        }
      })
      // obtengo nombre y badera del visitante
      equipos.forEach(e => {
        if (e._id == j.visitTeam) {
          j.visitTeam = e.name
          j.visitFlag = e.flag
        }
      })

      juegosDelGrupo.push(j)
    }
  })

  const betByGroup = []
  juegosDelGrupo.forEach(j => {
    apuestasJugador.forEach(a => {
      if (j._id == a.idGame) {
        a.localTeam = j.localTeam
        a.localFlag = j.localFlag
        a.visitTeam = j.visitTeam
        a.visitFlag = j.visitFlag
        a.group = req.params.g
        if (a.localScore == -1) { a.localScore = "" }
        if (a.visitScore == -1) { a.visitScore = "" }
        if (a.analogScore == -1) { a.analogScore = "" }
        betByGroup.push(a)
      }
    })
  }
  )


  //ANALISIS DE APUESTAS DE CLASIFICACION DEL GRUPO CONSULTADO
  const equiposByGrupo = []
  equipos.forEach(e => {
    if (e.group == req.params.g)
      equiposByGrupo.push(e)   // contiene los 4 equipos del modelo Team del grupo solicitado
  })

  const betClassificationByGroup = await BetClassification.find({ idUser: req.user.id, group: req.params.g }).lean()

  betClassificationByGroup.forEach(e => {   // el foreach sobra pues es un solo elemento, pero igual me gusta su implemen.
    if (e.firstTeam == " ") { e.firstTeam = "Sin asignar" }
    else {
      equiposByGrupo.forEach(g => {
        if (e.firstTeam == g._id) {
          e.firstTeam = g.name
          e.flagFirstTeam = g.flag
        }
      })
    }

    if (e.secondTeam == " ") { e.secondTeam = "Sin asignar" }
    else {
      equiposByGrupo.forEach(g => {
        if (e.secondTeam == g._id) {
          e.secondTeam = g.name
          e.flagSecondTeam = g.flag
        }
      })
    }

    if (e.thirdTeam == " ") { e.thirdTeam = "Sin asignar" }
    else {
      equiposByGrupo.forEach(g => {
        if (e.thirdTeam == g._id) {
          e.thirdTeam = g.name
          e.flagThirdTeam = g.flag
        }
      })
    }

    if (e.fourthTeam == " ") { e.fourthTeam = "Sin asignar" }
    else {
      equiposByGrupo.forEach(g => {
        if (e.fourthTeam == g._id) {
          e.fourthTeam = g.name
          e.flagFourthTeam = g.flag
        }
      })
    }


    // Data para las listas
    e.teamOne = equiposByGrupo[0].name
    e.teamOneId = equiposByGrupo[0]._id
    e.teamTwo = equiposByGrupo[1].name
    e.teamTwoId = equiposByGrupo[1]._id
    e.teamThree = equiposByGrupo[2].name
    e.teamThreeId = equiposByGrupo[2]._id
    e.teamFour = equiposByGrupo[3].name
    e.teamFourId = equiposByGrupo[3]._id

  })
  res.render('games', { betByGroup, betClassificationByGroup })
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
