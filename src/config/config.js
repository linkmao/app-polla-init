// Contiene elementos generales de la configuracion del juego
module.exports = {secretword:"Palabra que solo yo conozco",
tokenDuration:365*24*60*60,  // Duracion de un año para el token
pointByScore : 3,
pointByAnalogScore:2,
pointByClassificationOrder:3,
pointByClassificatioNoOrder:1,
pointByTeamOrder:3,
pointByFinalistFirstTeam:10,
pointByFinalistSecondTeam:7,
pointByFinalistThirdTeam:5,
pointByFinalistFourthTeam:3,
phaseInitial:1,
phaseEighth:2,
phaseFourth:3,
phaseSemiFinals:4,
phaseThirdFourth:5,
phaseFinal:6,
// La siguinte configuracion está asociado a la información necesaria para crear las apuestas de las etapas de cuartos de final, semifinal , y finales
// Estos arrays contienen el numero del juego necesario para conformar la respectiva etapa, se colocan en el orden necesario por ejemplo los juegos, 49 y 50 son los que me crean el juego 57. los juegos 53 y 54 crearan el juego 58, y así sucesivamente
numberGameFourth:[49,50,53,54,51,52,55,56],
numberGameSemiFinals:[57,58,59,60],
numberFinals:[61,62]
}

