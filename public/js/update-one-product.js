//LOGICA PARA EL BOTON ACTUALIZAR UN PRODUCTO
const updateProductForm = document.getElementById('updateProductForm');

updateProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

 const pid = window.location.pathname.split('/').pop();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const availability = parseInt(document.getElementById('availability').value);


  const updateProducto = {
    name,
    description,
    price,
    category,
    availability,

  };

  try {
    const response = await fetch(`/api/updateproducts/${pid}`,  {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProducto), 
    });

    if (response.ok) {
        console.log('Producto actualizado con éxito',updateProducto);
        window.location.href = "/api/updateproducts"; 
       } else {
        console.error('Error al actualizar el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});



