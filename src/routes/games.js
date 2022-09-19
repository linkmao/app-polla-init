const {Router}=require('express')
const router = Router()
const controller = require('../controllers/games.js')
const validar = require('../midleware/validaciones')
const Game = require('../models/Game')


// Version con autenticacion
// router.get('/', validar.isAuth, controller.getGames )
// router.get('/:id',validar.isAuth, controller.getGameById)
// router.get('/group/:g', validar.isAuth, controller.getGameByGroup)
// router.post('/', validar.isAuth, validar.isAdmin,controller.addGame )
// router.put('/:id', validar.isAuth, validar.isAdmin,controller.updateGame)
// router.delete('/:id', validar.isAuth, validar.isAdmin,controller.deleteGame )
// router.delete('/', validar.isAuth, validar.isAdmin,controller.deleteAllGames )


// Version sin autenticacion
router.get('/', controller.getGames )
router.get('/:id', controller.getGameById)
router.get('/group/:g',  controller.getGameByGroup)
router.post('/', controller.addGame )
router.put('/:id',controller.updateGame)
router.delete('/:id', controller.deleteGame )
router.delete('/', controller.deleteAllGames )

module.exports= router
