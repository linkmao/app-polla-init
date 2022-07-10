const BetFinalists = require('../models/Bet-finalist')

const getAllFinalists = async (req,res)=>{
  const allFinalists= await BetFinalists.find()
  res.status(200).json(allFinalists)
}

const  getMeFinalists = async (req, res)=>{
  const meFinalists = await BetFinalists.find({idUser:req.user.id})
  res.status(200).json(meFinalists) }

const getFinalistById=async (req, res)=>{
  const betFinalist = await BetFinalists.findById(req.params.id)
  res.status(200).json(betFinalist) 
}  

const addMeFinalist = async (req, res)=>{
    const {firstTeam, secondTeam, thirdTeam, fourthTeam}=req.body
    const newMeFinalist=new BetFinalists({idUser:req.user.id,firstTeam, secondTeam, thirdTeam, fourthTeam})
    await newMeFinalist.save()
    res.status(201).json(newMeFinalist)}

const addFinalist = async (req,res)=>{
  const {firstTeam, secondTeam, thirdTeam, fourthTeam}=req.body
  const newFinalist=new BetFinalists({idUser:req.params.iduser,firstTeam, secondTeam, thirdTeam, fourthTeam})
  await newFinalist.save()
  res.status(201).json(newFinalist)
}

const updateMeFinalist  = async (req, res)=>{
  const meFinalistUpdated = await BetFinalists.findOneAndUpdate( {idUser:req.user.id, _id:req.params.id }, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(meFinalistUpdated)
}

const updateFinalist= async(req,res)=>{
  const finalistUpdated = await BetFinalists.findOneAndUpdate({_id:req.params.id }, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(finalistUpdated)
}

const deleteMeFinalist = async (req, res)=>{
        const finalistMeDeleted= await BetFinalists.findOneAndDelete({idUser:req.user.id, _id:req.params.id})
        // res.status(200).send("Apuesta con id "+ req.params.id + " del jugador " + req.user.id + " ha sido borrado" )
        res.status(200).json(finalistMeDeleted)
}

const deleteAllMeFinalists= async(req, res)=>{
  await BetFinalists.deleteMany({idUser:req.user.id})
  res.status(200).send('Todos las apuestas de finalistas del usuario '+ req.user.id + " fueron borrados")
}

const deleteFinalist = async (req, res)=>{
  const finalistDeleted= await BetFinalists.findOneAndDelete({_id:req.params.id})
  // res.status(200).send("Apuesta con id "+ req.params.id + " del jugador " + req.user.id + " ha sido borrado" )
  res.status(200).json(finalistDeleted)
}

const deleteAllFinalistsByIdUser = async (req,res)=>{
  await BetFinalists.deleteMany({idUser:req.params.iduser})
  res.status(200).send('Todas las apueatas de finalistas del jugador'+req.params.iduser+ " fueron borradas")
}

const deleteAllFinalists= async(req, res)=>{
  await BetFinalists.deleteMany()
  res.status(200).send('Todos las apuestas de finalistas de todos los jugadores fueron borradas')
}

module.exports = {getAllFinalists, getMeFinalists, getFinalistById, addMeFinalist,addFinalist , updateMeFinalist,updateFinalist, deleteMeFinalist, deleteAllMeFinalists, deleteAllFinalistsByIdUser, deleteFinalist, deleteAllFinalists }