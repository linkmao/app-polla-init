const {Router}=require('express')
const router = Router()
const controller = require('../controllers/teams.js')
const validar= require('../midleware/validaciones')


// VERSION API CON AUTENTICACION
// router.get('/', validar.isAuth  ,controller.getTeam  )
// router.get('/:id', validar.isAuth, controller.getTeamById)
// router.post('/',validar.isAuth, validar.isAdmin, controller.addTeam )
// router.put('/:id', validar.isAuth, validar.isAdmin, controller.updateTeam)
// router.delete('/:id', validar.isAuth, validar.isAdmin, controller.deleteTeam )
// router.delete('/', validar.isAuth, validar.isAdmin, controller.deleteAllTeam )

// Version api de prueba sin necesidad d autentcacón
router.get('/', controller.getTeam  )
router.get('/:id', controller.getTeamById)
router.post('/', controller.addTeam )
router.put('/:id', controller.updateTeam)
router.delete('/:id', controller.deleteTeam )
router.delete('/',  controller.deleteAllTeam )

module.exports= router
