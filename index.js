const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.static('public'))

const usuarioRoutes = require('./src/routes/usuario.routes')
app.use('/api/usuarios', usuarioRoutes)



const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar:', error))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})