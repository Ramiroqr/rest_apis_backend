import express from "express";
import router from './router'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi, { serve } from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import db from "./config/db";
import colors from 'colors'

// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.white('Conexión exitosa a la BD'))
    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectarse a la BD'))
    }
}

connectDB()

const server = express()

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formulario
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server