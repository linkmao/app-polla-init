// Codigo con la lógica del juego
const betGame = require('../models/Bet-game')
const betClassification = require('../models/Bet-classification')
const betFinalist = require('../models/Bet-finalist')
const game= require('../models/Game')
const classification= require('../models/Classification')
const finalist = require('../models/Finalist')
const config = require('../config')


// Funcion que permite calcular en cada apuesta que tenga el idGame enviado, el puntaje ganado, ademas guarda el puntaje en earnedScore 
const calculatePointByGame = async (id) => {
games= await game.find({_id:id})
betGames = await betGame.find({idGame:id})
betGames.forEach(async e=>{
// Analisis por puntaje y por localia
let partialPoint = 0
if (games[0].localScore==e.localScore && games[0].visitScore==e.visitScore) {partialPoint+=config.pointByScore}
if (games[0].analogScore==e.analogScore) {partialPoint+=config.pointByAnalogScore}
// Si el juego es de cuartos, semi-final, tercer-cuarto, y final se gana puntaje por equipo acertado en la clasificacion de cada etapa
if (games[0].phase==config.phaseFourth || games[0].phase==config.phaseSemiFinals ||
  games[0].phase==config.phaseThirdFouth || games[0].phase==config.phaseFinal)
{
  if (e.localTeam==games[0].localTeam) {partialPoint+=config.pointByTeamOrder}
  if (e.visitTeam==games[0].visitTeam) {partialPoint+=config.pointByTeamOrder}
}
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
  partialPoint+=config.pointByClassificationOrder
} else {
  if (e.firstTeam==classifications[0].secondTeam){
  partialPoint+=config.pointByClassificatioNoOrder
  } else {
  partialPoint+=0
  }
}

// Compara el segundo equipo apostado del jugador con los de la clasificacion verdadera y se hace el analisis del orden
if (e.secondTeam==classifications[0].secondTeam){
  partialPoint+=config.pointByClassificationOrder
} else {
  if (e.secondTeam==classifications[0].firstTeam){
  partialPoint+=config.pointByClassificatioNoOrder
  } else {
  partialPoint+=0
  }
}
 // Guardado del puntaje ganado por el jugador en su documento de bet-classification
 await betClassification.findOneAndUpdate( {_id:e._id }, {earnedScore:partialPoint}) 
})
}

const calculatePointByFinalists = async() =>{
 const finalists= await finalist.find()
 const betFinalists = await betFinalist.find()
 betFinalists.forEach(async e =>{
 let partialPoint=0
 if (finalists[0].firstTeam == e.firstTeam) {partialPoint+=config.pointByFinalistFirstTeam}
 if (finalists[0].secondTeam == e.secondTeam) {partialPoint+=config.pointByFinalistSecondTeam}
 if (finalists[0].thirdTeam == e.thirdTeam) {partialPoint+=config.pointByFinalistThirdTeam}
 if (finalists[0].fourthTeam == e.fourthTeam) {partialPoint+=config.pointByFinalistFourthTeam}
 await betFinalist.findOneAndUpdate( {_id:e._id }, {earnedScore:partialPoint}) 
 })
}




module.exports = {calculatePointByGame, calculatePointByClassification, calculatePointByFinalists}