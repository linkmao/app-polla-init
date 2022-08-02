const {Router}=require('express')
const router = Router()
const controller = require('../controllers/bet-games.js')
const validar = require('../midleware/validaciones')

router.get('/',validar.isAuth, controller.getAllBets) //obtiene todas los apuestas, accede cualquier usuario
router.get('/me/bet', validar.isAuth, controller.getMeBets) //obtiene todas las apuestas, usuario logueado
router.get('/:id',validar.isAuth, controller.getBetGameById)  //obtiene cualquier apuesta por id, cualquier user
router.post('/me/bet', validar.isAuth, controller.addMeBetGame ) //crea apuesta usuario logueado
router.post('/:iduser', validar.isAuth, validar.isAdmin, controller.addBetGame) //crea apuesta a usuario con id ingresado por url, solo accede admmin
router.put('/me/bet/:id', validar.isAuth,controller.updateMeBetGame)//Actualiza apuesta usuario logueado
router.put('/me/bet/group/:id/:g', validar.isAuth,controller.updateMeBetGameGroup)//Actualiza apuesta usuario logueado y grupo del juego (para el frontend)
router.put('/:id', validar.isAuth, validar.isAdmin, controller.updateBetGame)
router.delete('/me/bet/:id', validar.isAuth,controller.deleteMeBetGame ) // Borra juego id accede usuario logueado
router.delete('/me/bet', validar.isAuth, controller.deleteAllMeBetGames ) //borra todos las apuestas de usuario logueado
router.delete('/:id', validar.isAuth, validar.isAdmin, controller.deleteBetGame)//borra apuesta con id, accede admin
router.delete('/admin/:iduser', validar.isAuth, validar.isAdmin, controller.deleteAllBetGameByIdUser) // Borrar todos los juegos de un usuario dado por id, accede admin
router.delete('/', validar.isAuth, validar.isAdmin, controller.deleteAllBetGames) //Borra las apuestas de todos los usuarios

module.exports= router
