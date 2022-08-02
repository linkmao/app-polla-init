const Group = require('../models/Group')

const  getGroup = async (req, res)=>{
  const groups = await Group.find()
  res.status(200).json(groups) }

const getGroupById=async (req, res)=>{
  const groupById = await Group.findById(req.params.id)
  res.status(200).json(groupById) 
}  

const addGroup = async (req, res)=>{
    const {name, team1, team2 , team3, team4 }=req.body
    const newTeam=new Group({name, team1, team2 , team3, team4})
    await newTeam.save()
    res.status(201).json({"message":"Grupo guardado"})}

const updateGroup  = async (req, res)=>{
  const groupUpdate = await Group.findByIdAndUpdate(req.params.id, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(teamUpdate)
  }

const deleteGroup = async (req, res)=>{
        await Group.findByIdAndDelete(req.params.id)
        res.status(200).send("Elemento "+ req.params.id + " borrado")}

const deleteAllGroup= async(req, res)=>{
  await Group.deleteMany()
  res.status(200).send('Todos los grupos fueron borrados')
}

module.exports = {getGroup, addGroup, updateGroup, deleteGroup, getGroupById, deleteAllGroup}