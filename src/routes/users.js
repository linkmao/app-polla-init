const {Router} = require('express')
const router= Router()
const controllers = require('../controllers/users')

router.get('/', controllers.getUsers)
router.get('/:id', controllers.getUsersById)
router.post('/', controllers.addUser)
router.put('/:id', controllers.updateUser)
router.delete('/', controllers.deleteAllUser)
router.delete('/:id',controllers.deleteUser)

module.exports= router