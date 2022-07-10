const {Router}=require('express')
const router = Router()
const controller = require('../controllers/games.js')
const validar = require('../midleware/validaciones')

router.get('/', validar.isAuth, controller.getGames )
router.get('/:id',validar.isAuth, controller.getGameById)
router.post('/', validar.isAuth, validar.isAdmin,controller.addGame )
router.put('/:id', validar.isAuth, validar.isAdmin,controller.updateGame)
router.delete('/:id', validar.isAuth, validar.isAdmin,controller.deleteGame )
router.delete('/', validar.isAuth, validar.isAdmin,controller.deleteAllGames )

module.exports= router
