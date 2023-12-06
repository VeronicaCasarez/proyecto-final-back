// LOGICA PARA AGREGAR UN PRODUCTO AL CARRITO
  document.querySelectorAll('.button-add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });

  function addToCart(event) {
    event.preventDefault();
    const cid = event.target.getAttribute("data-cart-id");
    const pid = event.target.id;
  
    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }
      return response.json();
    })
    .then(data => {
      alert("Producto agregado al carrito.");
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
    

   // LOGICA PARA MOSTRAR LOS DETALLES DEL PRODUCTO
document.querySelectorAll('.view-details-button').forEach(button => {
  button.addEventListener('click',  async (event) => {
     const pid = event.target.id;
 try {
    const response = await fetch(`/api/products/${pid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      window.location.href = `/api/products/${pid}`;
    } else {
      throw new Error('Error al ir al detalle');
    }
  } catch (error) {
    alert(error.message);
  }
  
});
});