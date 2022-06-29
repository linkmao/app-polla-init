const Classification = require('../models/Classification')

const  getClassification = async (req, res)=>{
  const classifications = await Classification.find()
  res.status(200).json(classifications) }

const getClassificationById=async (req, res)=>{
  const classificationById = await Classification.findById(req.params.id)
  res.status(200).json(classificationById) 
}  

const addClassification = async (req, res)=>{
    console.log(req.body)
    const newClassification=new Classification(req.body)
    await newClassification.save()
    res.status(201).json({"message":"Classificacion guardada"})}

const updateClassification  = async (req, res)=>{
  const classificationUpdate = await Classification.findByIdAndUpdate(req.params.id, req.body,{new:true}) 
  // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
  res.status(200).json(classificationUpdate)
  }

const deleteClassification = async (req, res)=>{
        await Classification.findByIdAndDelete(req.params.id)
        res.status(200).send("Clasificaco con id "+ req.params.id + " borrado")}

const deleteAllClassifications= async(req, res)=>{
  await Classification.deleteMany()
  res.status(200).send('Todos las clasificaciones fueron borrados')
}

module.exports = {getClassification, addClassification, updateClassification, deleteClassification, getClassificationById, deleteAllClassifications}