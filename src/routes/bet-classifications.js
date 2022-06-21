const {Router}=require('express')
const router = Router()
const controller = require('../controllers/bet-classifications.js')
const validar = require('../midleware/validaciones')

router.get('/',validar.verifyToken, controller.getAllClassifications) //obtiene todas los apuestas, accede cualquier usuario
router.get('/me/bet', validar.verifyToken, controller.getMeClassification) //obtiene todas las apuestas, usuario logueado
router.get('/:id',validar.verifyToken, controller.getClassificationById)  //obtiene cualquier apuesta por id, cualquier user
router.post('/me/bet', validar.verifyToken, controller.addMeClassification ) //crea apuesta usuario logueado
router.post('/:iduser', validar.verifyToken, validar.isAdmin, controller.addClassification) //crea apuesta a usuario con id ingresado por url, solo accede admmin
router.put('/me/bet/:id', validar.verifyToken,controller.updateMeClassification)//Actualiza apuesta usuario logueado
router.put('/:id', validar.verifyToken, validar.isAdmin, controller.updateClassification)
router.delete('/me/bet/:id', validar.verifyToken,controller.deleteMeClassification ) // Borra juego id accede usuario logueado
router.delete('/me/bet', validar.verifyToken, controller.deleteAllMeClassifications ) //borra todos las apuestas de usuario logueado
router.delete('/:id', validar.verifyToken, validar.isAdmin, controller.deleteClassification)//borra apuesta con id, accede admin
router.delete('/admin/:iduser', validar.verifyToken, validar.isAdmin, controller.deleteAllClassifitationsByIdUser) // Borrar todos las clasificaciones de un usuario dado por id, accede admin
router.delete('/', validar.verifyToken, validar.isAdmin, controller.deleteAllClassifications) //Borra las apuestas de todos los usuarios

module.exports= router
