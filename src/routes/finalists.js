const {Router}=require('express')
const router = Router()
const controller = require('../controllers/finalists.js')
const validar = require('../midleware/validaciones')

router.get('/', validar.isAuth, controller.getFinalists )
router.post('/', validar.isAuth, validar.isAdmin,controller.addFinalists)
router.put('/:id', validar.isAuth, validar.isAdmin,controller.updateFinalists)
router.delete('/', validar.isAuth, validar.isAdmin,controller.deleteFinalists )

module.exports= router
