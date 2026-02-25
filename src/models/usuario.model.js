const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no tiene un formato válido']
  },
  edad: {
    type: Number,
    required: true,
    min: [1, 'La edad debe ser mayor a 0'],
    max: [120, 'La edad no puede ser mayor a 120']
  }
})

module.exports = mongoose.model('Usuario', usuarioSchema)