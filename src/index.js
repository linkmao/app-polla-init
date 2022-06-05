const dotenv=require('dotenv')
const express = require('express')
const morgan = require ('morgan')
const teams= require('./routes/teams')
const games= require('./routes/games')
const users = require('./routes/users')
const app = express()
dotenv.config() // Permite que funcionen las variables de entorno

// Configuracion
require('./database')
app.set('port', process.env.PORT || 3000)


//Midleware
app.use(morgan('dev')) // Permite monitorear el tipo de peticion que se estpa haciendo
app.use(express.json()) // Permite que el servidor pueda responder con json
//rutas
app.use('/api/teams',teams)
app.use('/api/games',games)
app.use('/api/users', users)
//Iniciode del servidor
app.listen(app.get('port'), ()=>{console.log('app escuchando en el puerto '+ app.get('port'))})