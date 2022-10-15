const Game = require('../models/Game')
const BetGame = require('../models/Bet-game')
const BetClassification = require('../models/Bet-classification')
const Team = require('../models/Team')
const config = require('../config/config')


// Controlador para juegos por grupos (phase 1)
const getGameAndBet = async (phase,group,idUser)=>{
  const games= await Game.find({phase, group}).lean()
  const teams=await Team.find().lean()
  const betGames=await BetGame.find({idUser}).lean()
  const data=[]
  games.forEach(e=>{
    const gameNumber=e.gameNumber
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
    // Pequeña funcion encargargada de sumar todos los puntajes parciaales ganado por juego
    let totalScore=0
    earnedScore.forEach(e=>{totalScore+=e})
    //AL parcer Handlebars no trabaja con elementos de array es por eso que los resultados de los puntos ganados se llevan separaditos así
    const pointByScore = earnedScore[config.xPointByScore]
    const pointByAnalogScore=earnedScore[config.xPointByAnalogScore]
    data.push({idBet,gameNumber,  group, localTeam, visitTeam, localFlag,visitFlag,localScore,visitScore,analogScore, totalScore, pointByScore,pointByAnalogScore})
   })
   
return data  
}

//Controlador para clasificaciones de la etapas de grupos (phase 1) y tambien de los 4 finalistas (phase FINAL)
const getBetClassificationByGroup = async (group, idUser)=>{
  let teams=null, betClassification=null, games=null
  if(group!="FINAL"){
   // PARA LA ETAPA DE GRUPO, LOS EQUIPOS PARA APOSTAR SALEN DEL MODELO TEAM CON PROPIEDAD DEL GRUPO RESPECTIVO 
  teams=await Team.find({group}).lean()
  betClassification=await BetClassification.find({idUser, group}).lean()
  }
  else
  {
  // PARA EL CASO DE LA ETAPA FINAL LOS EQUIPOS SALEN DEL MODELO BETCLASSIFICATION 
  teams=await Team.find().lean()
  betClassification=await BetClassification.find({idUser, group}).lean()
  games=await Game.find().lean()
  betGames= await BetGame.find({idUser}).lean()
  }

  let betFirstTeam=null, flagFirstTeam=null, betSecondTeam=null, flagSecondTeam=null, betThirdTeam=null,flagThirdTeam=null, betFourthTeam=null,flagFourthTeam=null 
  const data=[]

  // NOTA MUY IMPORTANTE: Definitivamente a la fecha 22 de septienbre de 2022, tengo una dificultad con elacceso a los objetos que quedan guardados en los arrays despues de una consulta a base de datos, por ejemplo considere que se guarta en array teams la información que viene del modelo Team 
  //const teams=await Team.find({group}).lean()
// Si por ejemplo quiero acceder a el nombre del primer objeto de team intento con team[0].name, y ese valor lo quiero usar en un condicional o de cualquier otra cosa aparece como udefinied, generando unos errores graves. La manera como logré acceder a esos datos es usando metodos .foreach como se ve en la siguiente implementacion y dentro de ellos colocar el código

  betClassification.forEach(e=>{
    let teamId= e.firstTeam
     if (teamId!="NO-BET"){
      betFirstTeam=teams.find(t=>t._id==teamId).name
      flagFirstTeam=teams.find(t=>t._id==teamId).flag
      } else {
      betFirstTeam="Sin asignar"
      flagFirstTeam="no-flag.png"
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
let teamOne=null, teamOneId=null, teamTwo=null, teamTwoId=null, teamThree=null, teamThreeId=null, teamFour=null, teamFourId=null
const equipos=[]
const id=[]

// Si es la etapa de grupo, entonces teams tiene solo los 4 equipos del respectivo grupo
if(group!="FINAL") {
teams.forEach(t=>{
  equipos.push(t.name)
  id.push(t._id) 
})
teamOne= equipos[0]
teamOneId= id[0]
teamTwo= equipos[1]
teamTwoId= id[1]
teamThree= equipos[2]
teamThreeId= id[2]
teamFour= equipos[3]
teamFourId= id[3]
}
else{ // Si grupo es "FINAL" entonces los teams lo debo sacar de las apuestas de los partidos 63 y 64
  // Obtengo los id de los game 63 y 63
const idSemiGame = games.find(g=>g.gameNumber==63)._id
const idFinalGame= games.find(g=>g.gameNumber==64)._id
// Obtengo los id de los equipos apostados en los partidos 63 y 64
teamOneId= betGames.find(b=>b.idGame==idSemiGame).betLocalTeam
teamTwoId= betGames.find(b=>b.idGame==idSemiGame).betVisitTeam
teamThreeId= betGames.find(b=>b.idGame==idFinalGame).betLocalTeam
teamFourId= betGames.find(b=>b.idGame==idFinalGame).betVisitTeam
//Obtengo los nombres de los equipos apostados
teamOne=teams.find(t=>t._id==teamOneId).name
teamTwo=teams.find(t=>t._id==teamTwoId).name
teamThree=teams.find(t=>t._id==teamThreeId).name
teamFour=teams.find(t=>t._id==teamFourId).name
}

//Obtencion de los puntajes ganado en la apuesta
let totalScore=0
const pointByFirst = e.earnedScore[config.xPointByFirst]
const pointBySecond=e.earnedScore[config.xPointByFirst]
const pointByThirdh=e.earnedScore[config.xPointByThirdh]
const pointByFourth=e.earnedScore[config.xPointByFourth]
e.earnedScore.forEach(s=>totalScore+=s)
let renderFinal
{group=="FINAL" ? renderFinal=true : renderFinal=false}



data.push({group,idUser,betFirstTeam, flagFirstTeam, betSecondTeam,flagSecondTeam,betThirdTeam,flagThirdTeam,betFourthTeam,flagFourthTeam,teamOne,teamOneId,teamTwo,teamTwoId,teamThree,teamThreeId,teamFour,teamFourId, pointByFirst,pointBySecond,pointByThirdh,pointByFourth,totalScore,renderFinal})
  }) // fin del método
 
return data
}

// Controlador para los juegos por fases desde octavos hasta semifinal (phase 2, 3, 4)
const getGameAndBetByPhase =async (phase, gamesPhase,idUser)=>{
  const games= await Game.find().lean()
  const teams=await Team.find().lean()
  const betGames=await BetGame.find({idUser}).lean()
  const data=[]

  gamesPhase.forEach(g=>{
    // Se obtiene el ID de los 4 equipos
    const idGame1= games.find(t=>t.gameNumber==g[0])._id
    const gameNumber1=games.find(t=>t.gameNumber==g[0]).gameNumber
    const idGame2= games.find(t=>t.gameNumber==g[1])._id
    const gameNumber2=games.find(t=>t.gameNumber==g[1]).gameNumber
    const idNextGame = games.find(t=>t.gameNumber==g[2])._id
    let localTeamId1=null, visitTeamId1=null, localTeamId2=null, visitTeamId2=null

    if (phase==config.phaseEighth){
    localTeamId1=games.find(t=>t.gameNumber==g[0]).localTeam
    visitTeamId1=games.find(t=>t.gameNumber==g[0]).visitTeam
    localTeamId2=games.find(t=>t.gameNumber==g[1]).localTeam
    visitTeamId2=games.find(t=>t.gameNumber==g[1]).visitTeam
    } else{
    localTeamId1=betGames.find(t=>t.idGame==idGame1).betLocalTeam
    visitTeamId1=betGames.find(t=>t.idGame==idGame1).betVisitTeam
    localTeamId2=betGames.find(t=>t.idGame==idGame2).betLocalTeam
    visitTeamId2=betGames.find(t=>t.idGame==idGame2).betVisitTeam
    }
        
    const localTeam1=teams.find(t=>t._id==localTeamId1).name
    const visitTeam1=teams.find(t=>t._id==visitTeamId1).name
    const localTeam2=teams.find(t=>t._id==localTeamId2).name
    const visitTeam2=teams.find(t=>t._id==visitTeamId2).name
    const localFlag1=teams.find(t=>t._id==localTeamId1).flag
    const visitFlag1=teams.find(t=>t._id==visitTeamId1).flag
    const localFlag2=teams.find(t=>t._id==localTeamId2).flag
    const visitFlag2=teams.find(t=>t._id==visitTeamId2).flag

    const idBet1= betGames.find(b=>b.idGame==idGame1)._id
    let localScore1= betGames.find(b=>b.idGame==idGame1).localScore
    let visitScore1= betGames.find(b=>b.idGame==idGame1).visitScore
    let analogScore1= betGames.find(b=>b.idGame==idGame1).analogScore
    const earnedScore1= betGames.find(b=>b.idGame==idGame1).earnedScore
    
    const idBet2= betGames.find(b=>b.idGame==idGame2)._id
    let localScore2=betGames.find(b=>b.idGame==idGame2).localScore
    let visitScore2=betGames.find(b=>b.idGame==idGame2).visitScore
    let analogScore2=betGames.find(b=>b.idGame==idGame2).analogScore
    const earnedScore2=betGames.find(b=>b.idGame==idGame2).earnedScore

    console.log(earnedScore1)
    console.log(earnedScore2)
    {localScore1==-1 ? localScore1="" : localScore1 }
    {visitScore1==-1 ? visitScore1="" : visitScore1}
    {analogScore1==-1 ? analogScore1="": analogScore1}
    {localScore2==-1 ? localScore2="" : localScore2 }
    {visitScore2==-1 ? visitScore2="" : visitScore2}
    {analogScore2==-1 ? analogScore2="": analogScore2}

    // Se obtiene los nombres y banderas de los equipos que clasifican a la sigiente rnda
    const idBetLocalTeam= betGames.find(g=>g.idGame==idNextGame).betLocalTeam
    const idBetVisitTeam= betGames.find(g=>g.idGame==idNextGame).betVisitTeam
    let betLocalTeam=null, betVisitTeam=null, betLocalFlag=null, betVisitFlag=null
    if (idBetLocalTeam=="NO-BET"){
      betLocalTeam="Sin asignar"
      betLocalFlag="no-flag.png"
    }else{
      betLocalTeam=teams.find(t=>t._id==idBetLocalTeam).name
      betLocalFlag=teams.find(t=>t._id==idBetLocalTeam).flag
    }
    if (idBetVisitTeam=="NO-BET"){
      betVisitTeam="Sin asignar"
      betVisitFlag="no-flag.png"
    }else{
      betVisitTeam=teams.find(t=>t._id==idBetVisitTeam).name
      betVisitFlag=teams.find(t=>t._id==idBetVisitTeam).flag
    }

    //Tratamiento del puntaje discretizado
    let totalScore1=0, totalScore2=0
    earnedScore1.forEach(e=>{totalScore1+=e})
    earnedScore2.forEach(e=>{totalScore2+=e})
    //AL parcer Handlebars no trabaja con elementos de array es por eso que los resultados de los puntos ganados se llevan separaditos así
    const pointByScore1 = earnedScore1[config.xPointByScore]
    const pointByAnalogScore1=earnedScore1[config.xPointByAnalogScore]
    const pointByLocalEqual1=earnedScore1[config.xPointByLocalEqual]
    const pointByVisitEqual1=earnedScore1[config.xPointByVisitEqual]
    const pointByScore2 = earnedScore2[config.xPointByScore]
    const pointByAnalogScore2=earnedScore2[config.xPointByAnalogScore]
    const pointByLocalEqual2=earnedScore2[config.xPointByLocalEqual]
    const pointByVisitEqual2=earnedScore2[config.xPointByVisitEqual]
    
    let renderPoint = true
    if (phase==config.phaseEighth) renderPoint=false
    
    
    data.push({phase,gameNumber1, localTeamId1, localTeam1, localFlag1, visitTeamId1, visitTeam1, visitFlag1,gameNumber2, localTeamId2, localTeam2,localFlag2, visitTeamId2, visitTeam2, visitFlag2, idBet1, localScore1, visitScore1, analogScore1, totalScore1,pointByScore1,pointByAnalogScore1,pointByLocalEqual1,pointByVisitEqual1 , idBet2, localScore2, visitScore2, analogScore2, totalScore2,pointByScore2,pointByAnalogScore2, pointByLocalEqual2, pointByVisitEqual2, idNextGame, betLocalTeam, betVisitTeam, betLocalFlag, betVisitFlag, renderPoint})

  })
return data
}

//Controlador para los juegos de 3 y 4 y final (pase 5 y 6)
const getGameAndBetFinal =async (phase, gameStruct, idUser)=>{
const games= await Game.find().lean()
const teams= await Team.find().lean()
const betGames=await BetGame.find({idUser}).lean()
const data=[]

const idGame1=  games.find(g=>g.gameNumber==gameStruct[2])._id  // Id juego de tecer y cuarto puesto
const gameNumber1=gameStruct[2]
const idGame2=  games.find(g=>g.gameNumber==gameStruct[3])._id // Id juego final
const gameNumber2= gameStruct[3]




let localTeamId1=null, visitTeamId1=null, localTeamId2=null, visitTeamId2=null


  localTeamId1=betGames.find(t=>t.idGame==idGame1).betLocalTeam
  visitTeamId1=betGames.find(t=>t.idGame==idGame1).betVisitTeam
  localTeamId2=betGames.find(t=>t.idGame==idGame2).betLocalTeam
  visitTeamId2=betGames.find(t=>t.idGame==idGame2).betVisitTeam
  
  const localTeam1=teams.find(t=>t._id==localTeamId1).name
  const visitTeam1=teams.find(t=>t._id==visitTeamId1).name
  const localTeam2=teams.find(t=>t._id==localTeamId2).name
  const visitTeam2=teams.find(t=>t._id==visitTeamId2).name
  const localFlag1=teams.find(t=>t._id==localTeamId1).flag
  const visitFlag1=teams.find(t=>t._id==visitTeamId1).flag
  const localFlag2=teams.find(t=>t._id==localTeamId2).flag
  const visitFlag2=teams.find(t=>t._id==visitTeamId2).flag

  const idBet1= betGames.find(b=>b.idGame==idGame1)._id
  let localScore1= betGames.find(b=>b.idGame==idGame1).localScore
  let visitScore1= betGames.find(b=>b.idGame==idGame1).visitScore
  let analogScore1= betGames.find(b=>b.idGame==idGame1).analogScore
  const earnedScore1= betGames.find(b=>b.idGame==idGame1).earnedScore // Puntaje partido 3 y 4
  
  const idBet2= betGames.find(b=>b.idGame==idGame2)._id
  let localScore2=betGames.find(b=>b.idGame==idGame2).localScore
  let visitScore2=betGames.find(b=>b.idGame==idGame2).visitScore
  let analogScore2=betGames.find(b=>b.idGame==idGame2).analogScore
  const earnedScore2=betGames.find(b=>b.idGame==idGame2).earnedScore // Puntaje obtenido partioo final

  
    //AL parcer Handlebars no trabaja con elementos de array es por eso que los resultados de los puntos ganados se llevan separaditos así
  const pointByScore1 = earnedScore1[config.xPointByScore]
  const pointByAnalogScore1=earnedScore1[config.xPointByAnalogScore]
  const pointByLocalEqual1=earnedScore1[config.xPointByLocalEqual]
  const pointByVisitEqual1=earnedScore1[config.xPointByVisitEqual]
  const pointByScore2 = earnedScore2[config.xPointByScore]
  const pointByAnalogScore2=earnedScore2[config.xPointByAnalogScore]
  const pointByLocalEqual2=earnedScore2[config.xPointByLocalEqual]
  const pointByVisitEqual2=earnedScore2[config.xPointByVisitEqual]
// Datos de virtualGame donde estan guadados los puntos por la apuesta del equipo ganador en el partido de 3y4 y de final, el puntaje de 3y4 está guardado en earnedScore[xPointByLocalEqual] y partido de final está guardado en earnedSecore[xPointByVisitEqual]
const idVirtualGame =  games.find(g=>g.gameNumber==gameStruct[4])._id
const pointByWin1=  betGames.find(b=>b.idGame==idVirtualGame).earnedScore[config.xPointByLocalEqual]
const pointByWin2=  betGames.find(b=>b.idGame==idVirtualGame).earnedScore[config.xPointByVisitEqual]
console.log(pointByWin2)
let totalScore1=0, totalScore2=0
earnedScore1.forEach(e=>{totalScore1+=e}) 
earnedScore2.forEach(e=>{totalScore2+=e})
totalScore1+=pointByWin1
totalScore2+=pointByWin2

  {localScore1==-1 ? localScore1="" : localScore1 }
  {visitScore1==-1 ? visitScore1="" : visitScore1}
  {analogScore1==-1 ? analogScore1="": analogScore1}
  {localScore2==-1 ? localScore2="" : localScore2 }
  {visitScore2==-1 ? visitScore2="" : visitScore2}
  {analogScore2==-1 ? analogScore2="": analogScore2}

  // Se obtiene los datos del juego virtual donde se guaradan los equipos realmenta ganadores de tercer y cuarto puesto y de final
  
  const nextGame=gameStruct[4]
  const idNextGame = games.find(g=>g.gameNumber==nextGame)._id 
  

  // Se obtiene los nombres y banderas de los equipos que clasifican a la sigiente rnda
  const idBetLocalTeam= betGames.find(b=>b.idGame==idNextGame).betLocalTeam
  const idBetVisitTeam= betGames.find(b=>b.idGame==idNextGame).betVisitTeam
  let betLocalTeam=null, betVisitTeam=null, betLocalFlag=null, betVisitFlag=null
  if (idBetLocalTeam=="NO-BET"){
    betLocalTeam="Sin asignar"
    betLocalFlag="no-flag.png"
  }else{
    betLocalTeam=teams.find(t=>t._id==idBetLocalTeam).name
    betLocalFlag=teams.find(t=>t._id==idBetLocalTeam).flag
  }
  if (idBetVisitTeam=="NO-BET"){
    betVisitTeam="Sin asignar"
    betVisitFlag="no-flag.png"
  }else{
    betVisitTeam=teams.find(t=>t._id==idBetVisitTeam).name
    betVisitFlag=teams.find(t=>t._id==idBetVisitTeam).flag
  }

  const renderPoint=true  // flag para mostrar el puntaje por local y visitante coincidente
  const rederPointVirtualGame= true // flag para mostrar puntaje por ganador de 3y4 y final 

   data.push({phase,idNextGame, gameNumber1, localTeamId1, localTeam1, localFlag1, visitTeamId1, visitTeam1, visitFlag1,gameNumber2, localTeamId2, localTeam2,localFlag2, visitTeamId2, visitTeam2, visitFlag2, idBet1, localScore1, visitScore1, analogScore1, earnedScore1, idBet2, localScore2, visitScore2, analogScore2, earnedScore2, betLocalTeam, betLocalFlag, betVisitTeam, betVisitFlag,pointByScore1, pointByAnalogScore1,pointByLocalEqual1,pointByVisitEqual1,totalScore1,pointByScore2,pointByAnalogScore2,pointByLocalEqual2,pointByVisitEqual2,totalScore2,pointByWin1,pointByWin2, renderPoint, rederPointVirtualGame})
return data
}

//Esta función es llamada por getGameAndBetFinal para crear el partido de 3 y 4
const createGameThirdhAndFourth = async(idUser,gameStruct)=>{
  const games= await Game.find().lean()
  const betGames=await BetGame.find({idUser}).lean()
  
  //Obtengo los id de los Juegos de semi
  const idSemi1 = await games.find(g=>g.gameNumber==gameStruct[0])._id
  const idSemi2 = await games.find(g=>g.gameNumber==gameStruct[1])._id
  
  //Obtengo los id de los Juegos de tercer y cuarto y de la final
  const idThirdhAndFourth = await games.find(g=>g.gameNumber==gameStruct[2])._id
  const idFinal = await games.find(g=>g.gameNumber==gameStruct[3])._id
  
  //Obtengo los equipos de la semi
  const localTeamSemi1= await betGames.find(b=>b.idGame==idSemi1).betLocalTeam
  const visitTeamSemi1= await betGames.find(b=>b.idGame==idSemi1).betVisitTeam
  const localTeamSemi2= await betGames.find(b=>b.idGame==idSemi2).betLocalTeam
  const visitTeamSemi2= await betGames.find(b=>b.idGame==idSemi2).betVisitTeam
  
  // Obtengo los equipos apostados para la final 
  const localTeamFinal = await betGames.find(b=>b.idGame==idFinal).betLocalTeam
  const visitTeamFinal= await betGames.find(b=>b.idGame==idFinal).betVisitTeam
  
  // Realizo el analisis para determinar que equipos me llevo para conformar el partido de terceros y cuartos (llevo los no elegidos en la final)
  let localTeamThirdhAndFourth=null
  let visitTeamThirdhAndFourth=null
  
  if (localTeamSemi1==localTeamFinal) {
  localTeamThirdhAndFourth=visitTeamSemi1
  }else{
  localTeamThirdhAndFourth=localTeamSemi1
  }
  
  if (localTeamSemi2==visitTeamFinal) {
    visitTeamThirdhAndFourth=visitTeamSemi2
  }else{
    visitTeamThirdhAndFourth=localTeamSemi2
  }
  
  // Inicio proceso de guardado de los equipos para conformar la apuesta del juego tercero y cuarto
  await BetGame.findOneAndUpdate({ idUser, idGame:idThirdhAndFourth}, {betLocalTeam:localTeamThirdhAndFourth, betVisitTeam:visitTeamThirdhAndFourth})
}

module.exports = {getGameAndBet, getBetClassificationByGroup, getGameAndBetByPhase, getGameAndBetFinal, createGameThirdhAndFourth}