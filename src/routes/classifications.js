const {Router}=require('express')
const router = Router()
const controller = require('../controllers/classifications.js')
const validar = require('../midleware/validaciones')

router.get('/', validar.verifyToken, controller.getClassification )
router.get('/:id',validar.verifyToken, controller.getClassificationById)
router.post('/', validar.verifyToken, validar.isAdmin,controller.addClassification )
router.put('/:id', validar.verifyToken, validar.isAdmin,controller.updateClassification)
router.delete('/:id', validar.verifyToken, validar.isAdmin,controller.deleteClassification )
router.delete('/', validar.verifyToken, validar.isAdmin,controller.deleteAllClassifications )

module.exports= router
