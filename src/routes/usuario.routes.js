const express = require('express')
const router = express.Router()
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller')

router.get('/', getUsuarios)
router.post('/', crearUsuario)
router.put('/:id', actualizarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router