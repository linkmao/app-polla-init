const Game = require('../models/Game')
const BetGame = require('../models/Bet-game')
const BetClassification = require('../models/Bet-classification')
const Team = require('../models/Team')


const getGameAndBet = async (phase,group,idUser)=>{
  const games= await Game.find({phase, group}).lean()
  const teams=await Team.find().lean()
  const betGames=await BetGame.find({idUser}).lean()
  const data=[]
  games.forEach(e=>{
    const localTeam = teams.find(t=>t._id==e.localTeam).name
    const visitTeam= teams.find(t=>t._id==e.visitTeam).name
    const localFlag = teams.find(t=>t._id==e.localTeam).flag
    const visitFlag= teams.find(t=>t._id==e.visitTeam).flag
    let idBet= betGames.find(b=>b.idGame==e._id)._id
    let localScore= betGames.find(b=>b.idGame==e._id).localScore
    let visitScore= betGames.find(b=>b.idGame==e._id).visitScore
    let analogScore= betGames.find(b=>b.idGame==e._id).analogScore
    let earnedScore=betGames.find(b=>b.idGame==e._id).earnedScore
    {localScore==-1 ? localScore="": localScore}
    {visitScore==-1? visitScore="": visitScore}
    {analogScore=="-1"? analogScore="":analogScore}
    data.push({idBet, group, localTeam, visitTeam, localFlag,visitFlag,localScore,visitScore,analogScore, earnedScore})
   })
return data  
}


// 
const getBetClassificationByGroup = async (group, idUser)=>{
  const teams=await Team.find({group}).lean()
  const betClassification=await BetClassification.find({idUser, group}).lean()
  let betFirstTeam=null, flagFirstTeam=null, betSecondTeam=null, flagSecondTeam=null, betThirdTeam=null,flagThirdTeam=null, betFourthTeam=null,flagFourthTeam=null 

  // ACCEDIENDO A APUESTA HECHA 
  // console.log(betClassification)
  const data=[]

  // NOTA MUY IMPORTANTE: Definitivamente a la fecha 22 de septienbre de 2022, tengo una dificultad con elacceso a los objetos que quedan guardados en los arrays despues de una consulta a base de datos, por ejemplo considere que se guarta en array teams la información que viene del modelo Team 
  //const teams=await Team.find({group}).lean()
// Si por ejemplo quiero acceder a el nombre del primer objeto de team intento con team[0].name, y ese valor lo quiero usar en un condicional o de cualquier otra cosa aparece como udefinied, generando unos errores graves. La manera como logré acceder a esos datos es usando metodos .foreach como se ve en la siguiente implementacion y dentro de ellos colocar el código

  betClassification.forEach(e=>{
    let teamId= e.firstTeam
     if (teamId!="NO-BET"){
      betFirstTeam=teams.find(t=>t._id==teamId).name
      flagFirstTeam=teams.find(t=>t._id==teamId).flag
      console.log("Con apuesta: " , betFirstTeam)
    } else {
      betFirstTeam="Sin asignar"
      flagFirstTeam="no-flag.png"
      console.log("Sin apuesta: " , betFirstTeam)
    }

    teamId= e.secondTeam
    if (teamId!="NO-BET"){
      betSecondTeam=teams.find(t=>t._id==teamId).name
      flagSecondTeam=teams.find(t=>t._id==teamId).flag
    } else {
      betSecondTeam="Sin asignar"
      flagSecondTeam="no-flag.png"
    }

    teamId=e.thirdTeam
    if (teamId!="NO-BET"){
      betThirdTeam=teams.find(t=>t._id==teamId).name
      flagThirdTeam=teams.find(t=>t._id==teamId).flag
    } else {
      betThirdTeam="Sin asignar"
      flagThirdTeam="no-flag.png"
    }

    teamId=e.fourthTeam
    if (teamId!="NO-BET"){
      betFourthTeam=teams.find(t=>t._id==teamId).name
      flagFourthTeam=teams.find(t=>t._id==teamId).flag
    } else {
      betFourthTeam="Sin asignar"
      flagFourthTeam="no-flag.png"
    }
      
// ACCEDIENDO A LOS EQUIPOS
// Nota: Tratar de acceder directamente a los datos de un array que viene de una consulta, genera error, normalmente se debe usar algún metodo en ese array como .find() o foreach() y sacar lso datos de allí 
const equipos=[]
const id=[]

teams.forEach(t=>{
  equipos.push(t.name)
  id.push(t._id) 
})

const teamOne= equipos[0]
const teamOneId= id[0]
const teamTwo= equipos[1]
const teamTwoId= id[1]
const teamThree= equipos[2]
const teamThreeId= id[2]
const teamFour= equipos[3]
const teamFourId= id[3]

data.push({group,idUser,betFirstTeam, flagFirstTeam, betSecondTeam,flagSecondTeam,betThirdTeam,flagThirdTeam,betFourthTeam,flagFourthTeam,teamOne,teamOneId,teamTwo,teamTwoId,teamThree,teamThreeId,teamFour,teamFourId})

  }) // fin del método

return data
}


module.exports = {getGameAndBet, getBetClassificationByGroup}