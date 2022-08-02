const {Router}=require('express')
const router = Router()
const controller = require('../controllers/bet-classifications.js')
const validar = require('../midleware/validaciones')


// VERSION CON AUTENTICACION
// router.get('/',validar.isAuth, controller.getAllClassifications) //obtiene todas los apuestas, accede cualquier usuario
// router.get('/me/bet', validar.isAuth, controller.getMeClassification) //obtiene todas las apuestas, usuario logueado
// router.get('/:id',validar.isAuth, controller.getClassificationById)  //obtiene cualquier apuesta por id, cualquier user
// router.post('/me/bet', validar.isAuth, controller.addMeClassification ) //crea apuesta usuario logueado
// router.post('/:iduser', validar.isAuth, validar.isAdmin, controller.addClassification) //crea apuesta a usuario con id ingresado por url, solo accede admmin
// router.put('/me/bet/:id', validar.isAuth,controller.updateMeClassification)//Actualiza apuesta usuario logueado
// router.put('/:id', validar.isAuth, validar.isAdmin, controller.updateClassification)
// router.delete('/me/bet/:id', validar.isAuth,controller.deleteMeClassification ) // Borra juego id accede usuario logueado
// router.delete('/me/bet', validar.isAuth, controller.deleteAllMeClassifications ) //borra todos las apuestas de usuario logueado
// router.delete('/:id', validar.isAuth, validar.isAdmin, controller.deleteClassification)//borra apuesta con id, accede admin
// router.delete('/admin/:iduser', validar.isAuth, validar.isAdmin, controller.deleteAllClassifitationsByIdUser) // Borrar todos las clasificaciones de un usuario dado por id, accede admin
// router.delete('/', validar.isAuth, validar.isAdmin, controller.deleteAllClassifications) //Borra las apuestas de todos los usuarios


router.get('/', controller.getAllClassifications) //obtiene todas los apuestas, accede cualquier usuario
router.get('/me/bet',  controller.getMeClassification) //obtiene todas las apuestas, usuario logueado
router.get('/:id', controller.getClassificationById)  //obtiene cualquier apuesta por id, cualquier user
router.post('/me/bet', controller.addMeClassification ) //crea apuesta usuario logueado
router.post('/:iduser',  controller.addClassification) //crea apuesta a usuario con id ingresado por url, solo accede admmin
router.put('/me/bet/:id',controller.updateMeClassification)//Actualiza apuesta usuario logueado
router.put('/:id',  controller.updateClassification)
router.delete('/me/bet/:id', controller.deleteMeClassification ) // Borra juego id accede usuario logueado
router.delete('/me/bet', controller.deleteAllMeClassifications ) //borra todos las apuestas de usuario logueado
router.delete('/:id',  controller.deleteClassification)//borra apuesta con id, accede admin
router.delete('/admin/:iduser',  controller.deleteAllClassifitationsByIdUser) // Borrar todos las clasificaciones de un usuario dado por id, accede admin
router.delete('/',  controller.deleteAllClassifications) //Borra las apuestas de todos los usuarios

module.exports= router
