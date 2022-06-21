const {Router}=require('express')
const router = Router()
const controller = require('../controllers/teams.js')
const validar= require('../midleware/validaciones')

router.get('/', validar.verifyToken  ,controller.getTeam  )
router.get('/:id', validar.verifyToken, controller.getTeamById)
router.post('/',validar.verifyToken, validar.isAdmin, controller.addTeam )
router.put('/:id', validar.verifyToken, validar.isAdmin, controller.updateTeam)
router.delete('/:id', validar.verifyToken, validar.isAdmin, controller.deleteTeam )
router.delete('/', validar.verifyToken, validar.isAdmin, controller.deleteAllTeam )
module.exports= router
