const dotenv=require('dotenv')
const methodOverride = require('method-override')
const express = require('express')
const exphbs = require('express-handlebars') // Para el funcionamiento de handlebaras
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
const flash = require ('connect-flash') // Para el envio de mensajes del backend al frontend
const passport= require('passport') // Passport y sus dependencias auxiliares
const session = require('express-session') // Passport y sus dependencias auxiliares
const path= require('path') // para la obtencion de rutas del proyecto

const app = express()
dotenv.config() // Permite que funcionen las variables de entorno

// Configuracion
require('./config/database') // codigo de configuracion base de datos
require('./config/passport') // codigo de configuracion de passport

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
app.set('public',path.join(__dirname,'public'))

// Configuracion del motor de plantilla html
app.engine('.hbs',exphbs.engine({
  defaultLayout:'main.hbs',
  layoutsDir:path.join(app.get('views'),'layouts'),
  partialDir:path.join(app.get('views'),'partials'),
  extname:'.hbs'
}))
app.set('view engine','.hbs') // con esta linea queda lista la configuracion del motor de plantilla

//Midleware
app.use(morgan('dev')) // Permite monitorear el tipo de peticion que se estpa haciendo
app.use(express.json()) // Permite que el servidor pueda responder con json
app.use(express.static(app.get('public'))) //Configuracion carpeta publica (archivos estaticos) 
app.use(express.urlencoded({extended:false})) // envio de datos de fomrulario al backend
app.use(methodOverride('_method')) //// envio de datos de fomrulario al backendn (para put y delete)
app.use(session({
  secret:'Estedebesersinespacio',
  resave:true,
  saveUninitialized:true
}))  // Aun no comprendo bien para que es session
app.use(passport.initialize()) // Para usa passport
app.use(passport.session())  // para usar passport con session
app.use(flash()) // Para el envio de mensajes

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

