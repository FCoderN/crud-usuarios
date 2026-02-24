const API = 'http://localhost:3000/api/usuarios'

async function cargarUsuarios() {
  const res = await fetch(API)
  const usuarios = await res.json()
  const tabla = document.getElementById('tablaUsuarios')
  tabla.innerHTML = ''
  usuarios.forEach(u => {
    tabla.innerHTML += `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>${u.edad}</td>
        <td>
          <button onclick="editarUsuario('${u._id}', '${u.nombre}', '${u.email}', ${u.edad})" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="eliminarUsuario('${u._id}')" class="btn btn-danger btn-sm">Eliminar</button>
        </td>
      </tr>`
  })
}

async function guardarUsuario() {
  const id = document.getElementById('usuarioId').value
  const datos = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    edad: document.getElementById('edad').value
  }
  if (id) {
    await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
  } else {
    await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
  }
  limpiarFormulario()
  cargarUsuarios()
}

async function eliminarUsuario(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' })
  cargarUsuarios()
}

function editarUsuario(id, nombre, email, edad) {
  document.getElementById('usuarioId').value = id
  document.getElementById('nombre').value = nombre
  document.getElementById('email').value = email
  document.getElementById('edad').value = edad
}

function limpiarFormulario() {
  document.getElementById('usuarioId').value = ''
  document.getElementById('nombre').value = ''
  document.getElementById('email').value = ''
  document.getElementById('edad').value = ''
}

cargarUsuarios()