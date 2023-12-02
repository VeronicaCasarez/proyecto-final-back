// LOGICA PARA EL BOTON IR CAMBIAR ROL
document.querySelectorAll('.change-role-button').forEach(button => {
  button.addEventListener('click', moveToChangeRole);
});
function moveToChangeRole(event) {
  event.preventDefault();
  const userId = event.target.id;

  fetch(`/api/users/premium/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  .then(response => {
    if (response.ok) {
      window.location.href = `/api/users/premium/${userId}`;
    } else {
      throw new Error('Error al ir a modificar rol');
    }
  })
  .catch(error => {
    alert(error.message);
  });
}

//LOGICA PARA EL FORMULARIO CAMBIAR ROL
const changeUserForm = document.getElementById('update-role-user-form');
changeUserForm &&
changeUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newRole = document.getElementById('newRole').value.toString();

  const userEmail = document.getElementById('userEmail').value;

  try {
    const response = await fetch(`/api/users/byemail/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Obtiene el ID del usuario desde la respuesta
      const userId = await response.json();

      // Realiza una solicitud POST para actualizar el rol del usuario por ID
      const updateResponse = await fetch(`/api/users/premium/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newRole }), // Envía el nuevo rol como JSON
      });

      if (updateResponse.ok) {
        console.log('Rol de usuario actualizado con éxito', newRole);
        
        // Borra los campos de entrada estableciendo sus valores en cadena vacía
        document.getElementById('newRole').value = '';
        document.getElementById('userEmail').value = '';
      } else {
        console.error('Error al actualizar el rol del usuario:', updateResponse.statusText);
      }
    } else {
      console.error('Error al obtener el ID del usuario:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});

//LOGICA PARA QUE EL ADMINISTRADOR ELIMINE UN USUARIO
document.querySelectorAll('.button-delete-user').forEach(button => {
  button.addEventListener('click', deleteUser);
});

  function deleteUser(event) {
  event.preventDefault();
  const uid = event.target.id;
  
  fetch(`/api/users/${uid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
    return response.json();
  })
  .then(data => {
    console.log("Usuario eliminado");
    window.location.reload();
  })
  .catch(error => {
    console.log('Error:', error);
    
  });
}