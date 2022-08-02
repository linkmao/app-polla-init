const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Game = require('../models/Game')
const BetGame = require('../models/Bet-game')
const BetClassification=require('../models/Bet-classification')
const Team = require('../models/Team')
const validar = require('../midleware/validaciones')

// Ejemplo para el envio de datos (borrar cuando sea neecesario)
// router.get('/',(req,res)=> res.render('index',{message:"Radiohead Home", name:"Maolink"}) )
router.get('/', (req, res) => res.render('index'))
router.get('/about', (req, res) => res.render('about'))
router.get('/signup', (req, res) => res.render('user/signup'))


// Despues del logueo en signin, administrado por passport, este proporcina en req.user.id el id del usuario logueado, es entonces este valor que se usa en game para con consultar los juegos ()
router.get('/games', validar.isAuth, async (req, res) => {
  // console.log("Usuario logueado", req.user.id)
  // const user = await User.findById(req.user.id)
  const betGames = await BetGame.find({ idUser: req.user.id }).lean()
  res.render('games', { betGames })
})


//INICIO DEL ADEFECIO, FAVOR IR A README.MD PARA DETALLE
router.get('/groups/:g', validar.isAuth,  async (req, res) => {


  const betGameByGroup = []
  const equiposGrupo=[]
  const apuestas = await BetGame.find({ idUser: req.user.id }).lean()
  const betClassification = await BetClassification.find({idUser:req.user.id, group:req.params.g}).lean()

  

  const equipos = await Team.find().lean()
  User.find(x => {
  
    // Creo array con solo los equipos del grupo solicitado
    equipos.forEach(e=>{
      if (e.group==req.params.g) {
        equiposGrupo.push(e)
      } 
    })
    
    const ubicacion=[] // este array guarda el indice del elemento en apuestas que se le asigna el nmbre del equipo local o visitante, ademas de asifnar la nueva propiedad, para la bandera
    
    // Comienzo a recorrer array de apuestas y de juegos
    apuestas.forEach((a,i)=>{
      equiposGrupo.forEach(e=>{   // Analisis del equipo local
        if (a.localTeam==e._id) {
          a.localTeam=e.name
          a.localFlag=e.flag
          a.localGroup= req.params.g
          if (a.localScore==-1) {a.localScore=""} // Esto es para evitar que aparezca el -1 en la renderizacion
          if (a.analogScore=="-1") {a.analogScore=""}
          ubicacion.push(i)
        }
      })
      equiposGrupo.forEach(e=>{  // Analisis del equipo visitante
        if (a.visitTeam==e._id){
          a.visitTeam=e.name
          a.visitFlag=e.flag
          a.visitGroup= req.params.g
          if (a.visitScore==-1) {a.visitScore=""} // Esto es para evitar que aparezca el -1 en la renderizacion
          if (a.analogScore=="-1") {a.analogScore=""}
          ubicacion.push(i)
        }
      })
    })

    // Como el array ubicacon queda con valores dupplicados (pues lo hace para el equipo local y luego el visitante y ambos quedasn registrados) entonces tomé el siguiente codigo de internet para eliminar registros repetidos
    const filtrado= ubicacion.filter((item,index)=>{
      return ubicacion.indexOf(item)===index
    })

    // finalmente llete el array betGame ByGroup con las apuestas asociadas al grupo solicitado, ademas va con el nombre de los equipos y la bandera
    filtrado.forEach(e=>{
      betGameByGroup.push(apuestas[e])
    })
    // Renderizo
    
    res.render('games', { betGameByGroup, betClassification })
  })
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
