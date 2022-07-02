// Codigo con la lógica del juego
const betGame = require('../models/Bet-game')
const betClassification = require('../models/Bet-classification')
const classification= require('../models/Classification')
const configApp = require('../../config')

// Funcion que permite calcular en cada apuesta que tenga el idGame enviado, el puntaje ganado, ademas guarda el puntaje en earnedScore 
const calculatePointByGame = async (id, ls, vs, as) => {
betGames = await betGame.find({idGame:id})
betGames.forEach(async e=>{
let partialPoint = 0
if (ls==e.localScore && vs==e.visitScore) {partialPoint=configApp.pointByScore}
if (as==e.analogScore){partialPoint+=configApp.pointByAnalogScore}
 await betGame.findOneAndUpdate( {_id:e._id }, {earnedScore:partialPoint}) 
console.log('puntos del juego '+e.idGame+' en la apuesta '+ e._id+ ' es: ' +partialPoint )
})  
}


// Funcion que se encarga del calculo de los puntajes por claseficacion, se hace a partir de la comparacion del dcumento guardado o actualizado en classification con cdda uno de los documentos guardados en bet-classification, el parametro clave es el grupo

const calculatePointByClassification = async (groupUpdate)=>{
const classifications= await classification.find({group:groupUpdate})
const  betClassifications= await betClassification.find({group:groupUpdate})
 betClassifications.forEach(async e=>{
 let partialPoint=0
 // Compara el primer equpo apostado del jugador con los de la clasificacion verdadera y se hace el analisis del orden
if (e.firstTeam==classifications[0].firstTeam){  // Se usa [0] ya que se tiene un array y este debe acceder a su primer y único elemento (es de esperarse que no hayan mas pues solo hay un documento de clasificado por grupo)
  partialPoint+=configApp.pointByClassificationOrder
} else {
  if (e.firstTeam==classifications[0].secondTeam){
  partialPoint+=configApp.pointByClassificatioNoOrder
  } else {
  partialPoint+=0
  }
}

// Compara el segundo equipo apostado del jugador con los de la clasificacion verdadera y se hace el analisis del orden
if (e.secondTeam==classifications[0].secondTeam){
  partialPoint+=configApp.pointByClassificationOrder
} else {
  if (e.secondTeam==classifications[0].firstTeam){
  partialPoint+=configApp.pointByClassificatioNoOrder
  } else {
  partialPoint+=0
  }
}
 // Guardado del puntaje ganado por el jugador en su documento de bet-classification
 await betClassification.findOneAndUpdate( {_id:e._id }, {earnedScore:partialPoint}) 
})

}

module.exports = {calculatePointByGame, calculatePointByClassification}