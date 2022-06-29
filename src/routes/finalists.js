const {Router}=require('express')
const router = Router()
const controller = require('../controllers/finalists.js')
const validar = require('../midleware/validaciones')

router.get('/', validar.verifyToken, controller.getFinalists )
router.post('/', validar.verifyToken, validar.isAdmin,controller.addFinalists)
router.put('/:id', validar.verifyToken, validar.isAdmin,controller.updateFinalists)
router.delete('/', validar.verifyToken, validar.isAdmin,controller.deleteFinalists )

module.exports= router
