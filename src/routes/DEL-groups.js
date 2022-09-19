const {Router}=require('express')
const router = Router()
const controller = require('../controllers/groups')
const validar= require('../midleware/validaciones')


// VERSION API CON AUTENTICACION
// router.get('/', validar.isAuth  ,controller.getGroup  )
// router.get('/:id', validar.isAuth, controller.getGroupById)
// router.post('/',validar.isAuth, validar.isAdmin, controller.addGroup )
// router.put('/:id', validar.isAuth, validar.isAdmin, controller.updateGroup)
// router.delete('/:id', validar.isAuth, validar.isAdmin, controller.deleteGroup )
// router.delete('/', validar.isAuth, validar.isAdmin, controller.deleteAllGroup )

// Version api de prueba sin necesidad d autentcacón
router.get('/'  ,controller.getGroup  )
router.get('/:id', controller.getGroupById)
router.post('/', controller.addGroup )
router.put('/:id',  controller.updateGroup)
router.delete('/:id',  controller.deleteGroup )
router.delete('/',  controller.deleteAllGroup )

module.exports= router