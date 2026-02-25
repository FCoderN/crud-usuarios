const Usuario = require('../models/usuario.model')

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

const crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body)
    await usuario.save()
    res.json(usuario)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Ya existe un usuario con ese email' })
    } else {
      res.status(400).json({ error: 'Error al crear usuario' })
    }
  }
}

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' })
  }
}

const eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id)
    console.log(`Usuario ${req.params.id} eliminado`)
    res.json({ mensaje: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

module.exports = { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario }