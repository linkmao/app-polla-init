const BetGame = require('../models/Bet-game')
const config = require('../config/config')



const getAllBets = async (req,res)=>{
  const allBets= await BetGame.find()
  res.status(200).json(allBets)
}

const  getMeBets = async (req, res)=>{
  const bet = await BetGame.find({idUser:req.user.id})
  res.status(200).json(bet) }

const getBetGameById=async (req, res)=>{
  const betGameById = await BetGame.findById(req.params.id)
  res.status(200).json(betGameById) 
}  


const addMeBetGame = async (req, res)=>{
   console.log(req.body.phase)
    if (req.body.phase==config.phaseInitial || req.body.phase==config.phaseEighth)
    {
    const {idGame, localScore, visitScore, analogScore, phase}=req.body
    const newMeBet=new BetGame({idUser:req.user.id,idGame ,localScore, visitScore, analogScore, phase})
    await newMeBet.save()
    res.status(201).json(newMeBet)
    } else {
      const {idGame, localScore, visitScore, analogScore, phase, localTeam, visitTeam}=req.body
      const newMeBet=new BetGame({idUser:req.user.id,idGame ,localScore, visitScore, analogScore, phase, localTeam, visitTeam})
    await newMeBet.save()
    res.status(201).json(newMeBet)
    }
  }

const addBetGame = async (req,res)=>{
  if (req.body.phase==config.phaseInitial||req.body.phase==phaseEighth){
  const {idGame, localScore, visitScore, analogScore, phase}=req.body
  const newBet=new BetGame({idUser:req.params.iduser,idGame ,localScore, visitScore, analogScore, phase})
  await newBet.save()
  res.status(201).json(newBet)
  } else{
  const {idGame, localScore, visitScore, analogScore, phase, visitTeam, localTeam}=req.body
  const newBet=new BetGame({idUser:req.params.iduser,idGame ,localScore, visitScore, analogScore, phase, visitTeam, localTeam})
  await newBet.save()
  res.status(201).json(newBet)
  } 
}

const updateMeBetGame  = async (req, res)=>{
  const gameMeBetUpdate = await BetGame.findOneAndUpdate( {idUser:req.user.id, _id:req.params.id, }, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(gameMeBetUpdate)
  }

const updateBetGame= async(req,res)=>{
  const gameBetUpdate = await BetGame.findOneAndUpdate( {_id:req.params.id, }, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(gameBetUpdate)
}

const deleteMeBetGame = async (req, res)=>{
        const betMeErased= await BetGame.findOneAndDelete({idUser:req.user.id, _id:req.params.id})
        // res.status(200).send("Apuesta con id "+ req.params.id + " del jugador " + req.user.id + " ha sido borrado" )
        res.status(200).json(betMeErased)
}

const deleteBetGame = async (req, res)=>{
  const betErased= await BetGame.findOneAndDelete({_id:req.params.id})
  // res.status(200).send("Apuesta con id "+ req.params.id + " del jugador " + req.user.id + " ha sido borrado" )
  res.status(200).json(betErased)
}


const deleteAllMeBetGames= async(req, res)=>{
  await BetGame.deleteMany({idUser:req.user.id})
  res.status(200).send('Todos las apuestas del jugador '+ req.user.id + " fueron borrados")
}

const deleteAllBetGameByIdUser = async (req,res)=>{
  await BetGame.deleteMany({idUser:req.params.iduser})
  res.status(200).send('Todas las apueas del jugador'+req.params.iduser+ " fueron borradas")
}

const deleteAllBetGames= async(req, res)=>{
  await BetGame.deleteMany()
  res.status(200).send('Todos las apuestas de todos los jugadores fueron borradas')
}

module.exports = {getAllBets, getMeBets, getBetGameById, addMeBetGame,addBetGame , updateMeBetGame,updateBetGame, deleteMeBetGame, deleteAllMeBetGames, deleteBetGame, deleteAllBetGameByIdUser, deleteAllBetGames }