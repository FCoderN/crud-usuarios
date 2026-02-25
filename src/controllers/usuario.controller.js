const Usuario = require('../models/usuario.model')

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find()
  res.json(usuarios)
}

const crearUsuario = async (req, res) => {
  const usuario = new Usuario(req.body)
  await usuario.save()
  res.json(usuario)
}

const actualizarUsuario = async (req, res) => {
  const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
  res.json(usuario)
}

const eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id)
  res.json({ mensaje: 'Usuario eliminado' })
}

module.exports = { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario }