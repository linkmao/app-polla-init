const {Router}=require('express')
const router = Router()
const controller = require('../controllers/classifications.js')
const validar = require('../midleware/validaciones')

router.get('/', validar.isAuth, controller.getClassification )
router.get('/:id',validar.isAuth, controller.getClassificationById)
router.post('/', validar.isAuth, validar.isAdmin,controller.addClassification )
router.put('/:id', validar.isAuth, validar.isAdmin,controller.updateClassification)
router.delete('/:id', validar.isAuth, validar.isAdmin,controller.deleteClassification )
router.delete('/', validar.isAuth, validar.isAdmin,controller.deleteAllClassifications )

module.exports= router
