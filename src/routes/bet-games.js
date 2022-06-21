const {Router}=require('express')
const router = Router()
const controller = require('../controllers/bet-games.js')
const validar = require('../midleware/validaciones')

router.get('/',validar.verifyToken, controller.getAllBets) //obtiene todas los apuestas, accede cualquier usuario
router.get('/me/bet', validar.verifyToken, controller.getMeBets) //obtiene todas las apuestas, usuario logueado
router.get('/:id',validar.verifyToken, controller.getBetGameById)  //obtiene cualquier apuesta por id, cualquier user
router.post('/me/bet', validar.verifyToken, controller.addMeBetGame ) //crea apuesta usuario logueado
router.post('/:iduser', validar.verifyToken, validar.isAdmin, controller.addBetGame) //crea apuesta a usuario con id ingresado por url, solo accede admmin
router.put('/me/bet/:id', validar.verifyToken,controller.updateMeBetGame)//Actualiza apuesta usuario logueado
router.put('/:id', validar.verifyToken, validar.isAdmin, controller.updateBetGame)
router.delete('/me/bet/:id', validar.verifyToken,controller.deleteMeBetGame ) // Borra juego id accede usuario logueado
router.delete('/me/bet', validar.verifyToken, controller.deleteAllMeBetGames ) //borra todos las apuestas de usuario logueado
router.delete('/:id', validar.verifyToken, validar.isAdmin, controller.deleteBetGame)//borra apuesta con id, accede admin
router.delete('/admin/:iduser', validar.verifyToken, validar.isAdmin, controller.deleteAllBetGameByIdUser) // Borrar todos los juegos de un usuario dado por id, accede admin
router.delete('/', validar.verifyToken, validar.isAdmin, controller.deleteAllBetGames) //Borra las apuestas de todos los usuarios

module.exports= router
