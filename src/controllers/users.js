const User= require('../models/User.js')

const getUsers=async (req, res)=>{
  const Users= await User.find()
  res.status(200).json(Users)
}

const getMe = async(req,res)=>{
  console.log(req.user.id)
  const me= await User.findById(req.user.id)
  res.status(200).json(me)
}

const getUsersById = async (req, res)=>{
  const UserById= await User.findById(req.params.id)
  res.status(200).json(UserById)
}


const updateUser  = async (req, res)=>{
  const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(userUpdate)
  }

const updateMe= async(req, res)=>{
const meUpdate=await User.findByIdAndUpdate(req.user.id, req.body,{new:true} )
res.status(200).json(meUpdate)
}

const deleteUser = async (req, res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Usuario "+ req.params.id + " borrado")}

const deleteAllUser= async(req, res)=>{
  await User.deleteMany()
  res.status(200).send('Todos los usuarios fueron borrados')
}

const deleteMe = async (req,res)=>{
  const meDelete=await User.findByIdAndRemove(req.user.id)
  res.status(200).json(meDelete)
}


module.exports = {getUsers, getMe, getUsersById, updateUser,updateMe, deleteAllUser, deleteUser, deleteMe}