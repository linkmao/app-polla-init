const Game = require('../models/Game')
const {calculatePointByGame} = require('../logic/logic')

const  getGames = async (req, res)=>{
  const Games = await Game.find()
 res.json(Games)
}

const getGameById=async (req, res)=>{
  const GameById = await Game.findById(req.params.id)
  res.status(200).json(GameById) 
}  

const getGameByGroup=async (req, res)=>{
  const gamebygroup = await Game.find({analogScore:req.params.g}).lean()
  res.locals.juegos=gamebygroup
  // console.log('res: ', res.locals.juegos)
  // res.status(200).json(GameByGroup)
  // res.json(GameByGroup)
  // res.render('games',{gamebygroup})
   
  res.render('games',{gamebygroup})
  // res.redirect('/games')
}  

const addGame = async (req, res)=>{
    console.log(req.body)
    const {gameNumber, localTeam, visitTeam, phase}=req.body
    const newGame=new Game({gameNumber, localTeam, visitTeam, phase})
    await newGame.save()
    res.status(201).json({"message":"Juego guardado"})}


// Solo si forCalculate es true, el sistema hace el calculo del los puntajes, y coloca el estado del partide played en true

const updateGame  = async (req, res)=>{
    const gameUpdate = await Game.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(gameUpdate)
    if (req.body.forCalculate) await calculatePointByGame(req.params.id) 
    }

const deleteGame = async (req, res)=>{
        await Game.findByIdAndDelete(req.params.id)
        res.status(200).send("Juego con id "+ req.params.id + " borrado")}

const deleteAllGames= async(req, res)=>{
  await Game.deleteMany()
  res.status(200).send('Todos los juegos fueron borrados')
}

module.exports = {getGames, addGame, updateGame, deleteGame, getGameById, deleteAllGames, getGameByGroup}