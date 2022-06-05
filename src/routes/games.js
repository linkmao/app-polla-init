const {Router}=require('express')
const router = Router()
const controller = require('../controllers/games.js')


router.get('/', controller.getGames )

router.get('/:id', controller.getGameById)

router.post('/', controller.addGame )

router.put('/:id', controller.updateGame)

router.delete('/:id', controller.deleteGame )

router.delete('/', controller.deleteAllGames )


module.exports= router
