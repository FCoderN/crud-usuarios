const API = 'http://localhost:3000/api/usuarios'
const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalUsuario'))

// Muestra una notificación en la esquina superior derecha
function mostrarNotificacion(mensaje, tipo) {
  const notif = document.getElementById('notificacion')
  notif.textContent = mensaje
  notif.className = `notificacion ${tipo}`
  notif.style.display = 'block'
  setTimeout(() => { notif.style.display = 'none' }, 3500)
}

// Carga todos los usuarios y los renderiza en la tabla
async function cargarUsuarios() {
  const res = await fetch(API)
  const usuarios = await res.json()
  const tabla = document.getElementById('tablaUsuarios')
  tabla.innerHTML = ''
  if (usuarios.length === 0) {
    tabla.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">No hay usuarios registrados</td></tr>'
    return
  }
  usuarios.forEach(u => {
    tabla.innerHTML += `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>${u.edad}</td>
        <td>
          <button onclick="editarUsuario('${u._id}', '${u.nombre}', '${u.email}', ${u.edad})"
            class="btn btn-sm btn-outline-warning me-1">Editar</button>
          <button onclick="eliminarUsuario('${u._id}')"
            class="btn btn-sm btn-outline-danger">Eliminar</button>
        </td>
      </tr>`
  })
}

// Crea o edita según si hay ID en el input oculto
async function guardarUsuario() {
  const id = document.getElementById('usuarioId').value
  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    email:  document.getElementById('email').value.trim(),
    edad:   document.getElementById('edad').value
  }

  if (!datos.nombre || !datos.email || !datos.edad) {
    mostrarNotificacion('Por favor completa todos los campos', 'error')
    return
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)
  if (!emailValido) {
    mostrarNotificacion('El email no tiene un formato válido', 'error')
    return
  }

  if (datos.edad <= 0 || datos.edad > 120) {
    mostrarNotificacion('La edad debe ser un número entre 1 y 120', 'error')
    return
  }

  const url    = id ? `${API}/${id}` : API
  const metodo = id ? 'PUT' : 'POST'

  const res = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })

  const data = await res.json()

  if (!res.ok) {
    mostrarNotificacion(data.error || 'Error al guardar', 'error')
    return
  }

  modal.hide()
  limpiarFormulario()
  cargarUsuarios()
  mostrarNotificacion(id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente', 'exito')
}

// Elimina un usuario por su ID
async function eliminarUsuario(id) {
  if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return
  await fetch(`${API}/${id}`, { method: 'DELETE' })
  cargarUsuarios()
  mostrarNotificacion('Usuario eliminado', 'exito')
}

// Rellena el formulario y abre el modal en modo edición
function editarUsuario(id, nombre, email, edad) {
  document.getElementById('usuarioId').value = id
  document.getElementById('nombre').value   = nombre
  document.getElementById('email').value    = email
  document.getElementById('edad').value     = edad
  document.getElementById('modalTitulo').textContent = 'Editar Usuario'
  modal.show()
}

// Limpia todos los campos del formulario
function limpiarFormulario() {
  document.getElementById('usuarioId').value = ''
  document.getElementById('nombre').value   = ''
  document.getElementById('email').value    = ''
  document.getElementById('edad').value     = ''
  document.getElementById('modalTitulo').textContent = 'Nuevo Usuario'
}

cargarUsuarios()