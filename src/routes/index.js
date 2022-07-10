const {Router}=require('express')
const router = Router()


router.get('/',(req,res)=> res.render('index',{messagge:"Radiohead Home", name:"Maolink"}) )
router.get('/about',(req,res)=> res.render('about',{messagge:"Radiohead Home", name:"Maolink"}))
 router.get('/signup',(req,res)=> res.render('user/signup',{messagge:"Radiohead Home", name:"Maolink"}))

 router.get('/notok',(req,res)=> res.render('falla',{messagge:"Radiohead Home", name:"Maolink"}))
 router.get('/ok',(req,res)=> res.render('exito',{messagge:"Radiohead Home", name:"Maolink"}))


module.exports= router
