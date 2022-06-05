const {Router}=require('express')
const router = Router()
const controller = require('../controllers/teams.js')


router.get('/', controller.getTeam )

router.get('/:id', controller.getTeamById)

router.post('/', controller.addTeam )

router.put('/:id', controller.updateTeam)

router.delete('/:id', controller.deleteTeam )

router.delete('/', controller.deleteAllTeam )


module.exports= router
