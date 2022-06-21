const {Router} = require('express')
const router= Router()
const controllers = require('../controllers/users')
const validar = require('../midleware/validaciones')

router.get('/', validar.verifyToken, controllers.getUsers) // obtener todos los usuarios accede cualquiera
router.get('/:id', validar.verifyToken, controllers.getUsersById) //obtener usuario por id, accede cualquiera
router.get('/me/profile', validar.verifyToken, controllers.getMe) //obtener usuario logueado, accede propio usuario
router.put('/:id', validar.verifyToken, validar.isAdmin,controllers.updateUser) // actualiza usuario por id, accede admin
router.put('/me/update', validar.verifyToken, controllers.updateMe) //actuializa usuario accede propio usuario
router.delete('/', validar.verifyToken, validar.isAdmin,controllers.deleteAllUser) //borra todos los usuarios, solo admin
router.delete('/:id',validar.verifyToken, validar.isAdmin, controllers.deleteUser)//borra usuario por id accede admin
router.delete('/me/delete', validar.verifyToken, controllers.deleteMe)//borra el usuario logueado
module.exports= router