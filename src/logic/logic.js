// Codigo con la lógica del juego
const betGame = require('../models/Bet-game')
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

module.exports = {calculatePointByGame}