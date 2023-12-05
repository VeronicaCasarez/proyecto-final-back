// LOGICA PARA EL BOTON IR AL CARRITO
document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', moveToCart);
  });
  
  function moveToCart(event) {
    event.preventDefault();
  
    const cartId = event.target.id;
   
    fetch(`/api/carts/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = `/api/carts/${cartId}`;
      } else {
        throw new Error('Error al ir al carrito');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  };

  //LOGICA PARA ELIMINAR UN SOLO PRODUCTO DEL CARRITO
  document.querySelectorAll('.button-remove-product').forEach(button => {
    button.addEventListener('click', removeOneproduct);
  });
  
  function removeOneproduct(event) {
    event.preventDefault();
    const cid = event.target.getAttribute("data-cart-id");
    const pid = event.target.id;
    console.log(cid)
    console.log(pid)
  
    fetch(`/api/carts/${cid}/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      return response.json();
    })
    .then(data => {
      console.log("Producto eliminado");
      window.location.href = `/api/carts/${cid}`; 
    })
    .catch(error => {
      alert(error.message);
    });
  };
  
  //LOGICA PARA VACIAR TODO EL CARRITO
  document.querySelectorAll('.button-empty-cart').forEach(button => {
    button.addEventListener('click', emptyCart);
  });
  
  function emptyCart(event) {
    event.preventDefault();
    const cid = event.target.id;
  
    fetch(`/api/carts/${cid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al vaciar el carrito');
      }
      return response.json();
    })
    .then(data => {
      console.log("Productos eliminados");
      window.location.reload();
    })
    .catch(error => {
      alert(error.message);
      
    });
  };

  //LOGICA PARA AUMENTAR Y DISMINUIR LA CANTIDAD DE UN PRODUCTO
  // Lógica para disminuir la cantidad de un producto en el carrito
document.querySelectorAll('.button-decrease-quantity').forEach(button => {
  button.addEventListener('click', decreaseQuantity);
});

function decreaseQuantity(event) {
  event.preventDefault();
  const cid = event.target.getAttribute("data-cart-id");
  const pid = event.target.id;

  fetch(`/api/carts/${cid}/${pid}/decrease`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al disminuir la cantidad del producto');
    }
    return response.json();
  })
  .then(data => {
    window.location.reload();
  })
  .catch(error => {
    alert(error.message);
  });
}

// Lógica para aumentar la cantidad de un producto en el carrito
document.querySelectorAll('.button-increase-quantity').forEach(button => {
  button.addEventListener('click', increaseQuantity);
});

function increaseQuantity(event) {
  event.preventDefault();
  const cid = event.target.getAttribute("data-cart-id");
  const pid = event.target.id;

  fetch(`/api/carts/${cid}/${pid}/increase`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al aumentar la cantidad del producto');
    }
    return response.json();
  })
  .then(data => {
    window.location.reload();
  })
  .catch(error => {
    alert(error.message);
  });
}

  