const Game = require('../models/Game')

const  getGames = async (req, res)=>{
  const Games = await Game.find()
  res.status(200).json(Games) }

const getGameById=async (req, res)=>{
  const GameById = await Game.findById(req.params.id)
  res.status(200).json(GameById) 
}  

const addGame = async (req, res)=>{
    console.log(req.body)
    const {gameNumber, localTeam, visitTeam, localScore, visitScore}=req.body
    const newGame=new Game({gameNumber, localTeam, visitTeam, localScore, visitScore})
    await newGame.save()
    res.status(201).json({"message":"Juego guardado"})}

const updateGame  = async (req, res)=>{
  const gameUpdate = await Game.findByIdAndUpdate(req.params.id, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(gameUpdate)
  }

const deleteGame = async (req, res)=>{
        await Game.findByIdAndDelete(req.params.id)
        res.status(200).send("Juego con id "+ req.params.id + " borrado")}

const deleteAllGames= async(req, res)=>{
  await Game.deleteMany()
  res.status(200).send('Todos los juegos fueron borrados')
}

module.exports = {getGames, addGame, updateGame, deleteGame, getGameById, deleteAllGames}