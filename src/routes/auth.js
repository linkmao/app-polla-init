const {Router} = require('express')
const auth=require('../controllers/auth')
const router = Router()
const validar= require('../midleware/validaciones')

router.post('/signup', validar.validityEmail, auth.signUp)
router.post('/signin', auth.signIn)

module.exports = router