   // LOGICA PARA BOTON FINALIZAR COMPRA
   document.querySelectorAll('.button-finish-purchase').forEach(button => {
    button.addEventListener('click', moveToPurchase);
  });
  
  function moveToPurchase(event) {
    event.preventDefault();
  
    const cid = event.target.id;
    
    fetch(`/api/carts/${cid}/purchase/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = `/api/carts/${cid}/finishpurchase/`;
      } else {
        throw new Error('Error al ir a compra');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }
  