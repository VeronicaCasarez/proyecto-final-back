const restoreForm = document.getElementById('restore-form');

restoreForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;

  try {
    const response = await fetch('/api/restore-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }) 
    });

    const result = await response.json();
    console.log("aca en el restore front", result)
    if (result.success) {
      console.log('Correo de recuperación enviado');
    } else {
      console.log('Correo electrónico no encontrado');
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
});
