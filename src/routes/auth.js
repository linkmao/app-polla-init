const {Router} = require('express')
const auth=require('../controllers/auth')
const router = Router()
const validar= require('../midleware/validaciones')
const passport= require('passport')

router.post('/signup', validar.validityEmail, validar.validyPass, auth.signUp)
// router.post('/signin', auth.signIn)

router.post('/signin',passport.authenticate('local',{
  successRedirect:'../../ok',
  failureRedirect:'../../notok',
  failureFlash:false
}))

module.exports = router