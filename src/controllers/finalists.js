const Finalists = require('../models/Finalist')

const  getFinalists = async (req, res)=>{
  const finalists = await Finalists.find()
  res.status(200).json(finalists) }

const addFinalists = async (req, res)=>{
    console.log(req.body)
    const newFinalists=new Finalists(req.body)
    await newFinalists.save()
    res.status(201).json({"message":"Finalistas guardado"})}

const updateFinalists  = async (req, res)=>{
  const finalistsUpdate = await Finalists.findByIdAndUpdate (req.params.id, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo de vuelva el objeto actualizado
  res.status(200).json(finalistsUpdate)
  }

const deleteFinalists= async(req, res)=>{
  await Finalists.deleteMany()
  res.status(200).send('Documento únido de finalistas fue borrado')
}

module.exports = {getFinalists, addFinalists, updateFinalists, deleteFinalists}