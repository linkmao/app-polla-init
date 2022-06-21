const {Router}=require('express')
const router = Router()
const controller = require('../controllers/games.js')
const validar = require('../midleware/validaciones')

router.get('/', validar.verifyToken, controller.getGames )
router.get('/:id',validar.verifyToken, controller.getGameById)
router.post('/', validar.verifyToken, validar.isAdmin,controller.addGame )
router.put('/:id', validar.verifyToken, validar.isAdmin,controller.updateGame)
router.delete('/:id', validar.verifyToken, validar.isAdmin,controller.deleteGame )
router.delete('/', validar.verifyToken, validar.isAdmin,controller.deleteAllGames )

module.exports= router
