const {Router} = require('express')
const router= Router()
const controllers = require('../controllers/users')
const validar = require('../midleware/validaciones')

router.get('/', validar.isAuth, controllers.getUsers) // obtener todos los usuarios accede cualquiera
router.get('/:id', validar.isAuth, controllers.getUsersById) //obtener usuario por id, accede cualquiera
router.get('/me/profile', validar.isAuth, controllers.getMe) //obtener usuario logueado, accede propio usuario
router.put('/:id', validar.isAuth, validar.isAdmin,controllers.updateUser) // actualiza usuario por id, accede admin
router.put('/me/profile', validar.isAuth, controllers.updateMe) //actuializa usuario accede propio usuario
router.put('/me/password', validar.isAuth,validar.validyPass,controllers.updatePassword)
router.delete('/', validar.isAuth, validar.isAdmin,controllers.deleteAllUser) //borra todos los usuarios, solo admin
router.delete('/:id',validar.isAuth, validar.isAdmin, controllers.deleteUser)//borra usuario por id accede admin
router.delete('/me/delete', validar.isAuth, controllers.deleteMe)//borra el usuario logueado
module.exports= router