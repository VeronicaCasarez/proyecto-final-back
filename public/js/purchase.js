   // LOGICA PARA BOTON FINALIZAR COMPRA
   document.querySelectorAll('.button-finish-purchase').forEach(button => {
    button.addEventListener('click', moveToPurchase);
  });
  
  function moveToPurchase(event) {
    event.preventDefault();
  
    const cartId = event.target.id;
    
    fetch(`/api/carts/${cartId}/purchase/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        
        // Redirigir a la compra si es exitosa
        window.location.href = `/api/carts/${cartId}/finishpurchase/`;
      } else {
        // Manejar errores aquí
        throw new Error('Error al ir a compra');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }
  