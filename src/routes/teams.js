const {Router}=require('express')
const router = Router()
const Team = require('../models/Team')


router.get('/', async (req, res)=>{
  const Teams = await Team.find()
  res.status(200).json(Teams) })

router.post('/', async (req, res)=>{
  console.log(req.body)
  const {name, group}=req.body
  const newTeam=new Team({name, group})
  await newTeam.save()
  res.status(201).json({"message":"Equipo guardado"})})

router.put('/', (req, res)=>{
 console.log(req.body)
 res.status(200).json(req.body)})

router.delete('/:id', (req, res)=>{
 console.log(req.params.id)
 res.status(200).send("Elemento "+ req.params.id + " borrado")})


// router.get('/', (req, res)=>{res.send('<h2>Servidor corriendo</h2>')  })
// router.get('/', (req, res)=>{res.send('<h2>Servidor corriendo</h2>')  })

module.exports= router
