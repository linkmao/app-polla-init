const {Router}=require('express')
const router = Router()
const controller = require('../controllers/bet-finalists.js')
const validar = require('../midleware/validaciones')

router.get('/',validar.verifyToken, controller.getAllFinalists) //obtiene todas los finalistas, accede cualquier usuario
router.get('/me/bet', validar.verifyToken, controller.getMeFinalists) //obtiene todas los finalistas, usuario logueado
router.get('/:id',validar.verifyToken, controller.getFinalistById)  //obtiene cualquier finalista por id, cualquier user
router.post('/me/bet', validar.verifyToken, controller.addMeFinalist ) //crea finalista usuario logueado
router.post('/:iduser', validar.verifyToken, validar.isAdmin, controller.addFinalist) //crea finalista a usuario con id ingresado por url, solo accede admmin
router.put('/me/bet/:id', validar.verifyToken,controller.updateMeFinalist)//Actualiza finalista usuario logueado
router.put('/:id', validar.verifyToken, validar.isAdmin, controller.updateFinalist) //Actualiza finalista id, solo accede admin
router.delete('/me/bet/:id', validar.verifyToken,controller.deleteMeFinalist ) // Borra finalista id accede usuario logueado
router.delete('/me/bet', validar.verifyToken, controller.deleteAllMeFinalists ) //borra todos los finalistas de usuario logueado
router.delete('/:id', validar.verifyToken, validar.isAdmin, controller.deleteFinalist)//borra finalista con id, accede admin
router.delete('/admin/:iduser', validar.verifyToken, validar.isAdmin, controller.deleteAllFinalistsByIdUser) // Borrar todos los finalistas de un usuario dado por id, accede admin
router.delete('/', validar.verifyToken, validar.isAdmin, controller.deleteAllFinalists) //Borra las apuestas de todos los usuarios, solo accede admin

module.exports= router
