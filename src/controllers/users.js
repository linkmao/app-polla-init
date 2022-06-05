const User= require('../models/User.js')

const getUsers=async (req, res)=>{
  const Users= await User.find()
  res.status(200).json(Users)
}


const getUsersById = async (req, res)=>{
  const UserById= await User.findById(req.params.id)
  res.status(200).json(UserById)
}

const addUser = async (req,res)=>{
  const {email, pass, name, lastName, phone}= req.body
  const newUser=new User({email, pass, name, lastName, phone})
  await newUser.save()
  res.status(200).json(newUser)
}

const updateUser  = async (req, res)=>{
  const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(userUpdate)
  }

const deleteUser = async (req, res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Usuario "+ req.params.id + " borrado")}

const deleteAllUser= async(req, res)=>{
  await User.deleteMany()
  res.status(200).send('Todos los usuarios fueron borrados')
}


module.exports = {getUsers, getUsersById, addUser, updateUser, deleteAllUser, deleteUser}