// //LOGICA PARA IR A PAGAR CON STRIPE
// document.querySelectorAll('.go-to-pay-stripe').forEach(button => {
//     button.addEventListener('click',  async (event) => {

//    try {
//       const response = await fetch(`/api/payments/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });

//       if (response.ok) {
//         window.location.href = `/api/payments`;
//       } else {
//         throw new Error('Error al ir al stripe');
//       }
//     } catch (error) {
//       alert(error.message);
//     }
    
//   });
// });