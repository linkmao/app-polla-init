const dotenv=require('dotenv')
const methodOverride = require('method-override')
const express = require('express')
const morgan = require ('morgan')
const teams= require('./routes/teams')
const games= require('./routes/games')
const classifications= require('./routes/classifications')
const finalists= require('./routes/finalists')
const users = require('./routes/users')
const auth=require('./routes/auth')
const betGame=require('./routes/bet-games')
const betClassification = require('./routes/bet-classifications')
const betFinalists= require ('./routes/bet-finalists')
const index= require('./routes/index')
// Para el funcionamiento de ejs
const ejs = require('ejs')
const path= require('path')

const app = express()
dotenv.config() // Permite que funcionen las variables de entorno

// Configuracion
require('./database')
app.set('port', process.env.PORT || 3000)

//Midleware
app.use(morgan('dev')) // Permite monitorear el tipo de peticion que se estpa haciendo
app.use(express.json()) // Permite que el servidor pueda responder con json

// Configuracion de ejs
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs' ) // configuracion para usar el motor de plantilla ejs para crear html
app.use(express.static(path.join(__dirname,'public'))) //esta forma configuro express para que tenga una carpera estatica

// Configuracion del backend para que reciba datos de los formularios desde el forntend
app.use(express.urlencoded({extended:false})) // es el que permite e envio de datos de formularios al backend exntend false es para que solo el envio sea de texto
app.use(methodOverride('_method'))


console.log(path.join(__dirname,'public'))

//rutas
app.use('/', index)
app.use('/api/teams',teams)
app.use('/api/games',games)
app.use('/api/classifications',classifications)
app.use('/api/finalists',finalists)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/bet/games', betGame)
app.use('/api/bet/classifications', betClassification)
app.use('/api/bet/finalists', betFinalists)
//Iniciode del servidor
app.listen(app.get('port'), ()=>{console.log('app escuchando en el puerto '+ app.get('port'))})

