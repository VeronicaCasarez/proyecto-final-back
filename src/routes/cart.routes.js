import { Router } from "express";
import { passportCall } from "../utils.js";
import { isUser } from "./middlewares.routes.js";
import {
  saveCart,
  getAllCarts,
  getCartById,
  updateCart,
  generatedTicket,
  emptyCart,
  deleteCart
} from "../controller/cart.controller.js";
import {
  getTicketById,
  getTicketByEmail,
} from "../controller/ticket.controller.js";


const router = Router();
//const cartsManager = new Carts();

//const productsManager = new Product();

router.get("/", passportCall("jwt"),  getAllCarts);

router.post("/", passportCall("jwt"),  saveCart);

router.get("/:cid", passportCall("jwt"),  getCartById);

router.post("/:cid/purchase/", passportCall("jwt"),  generatedTicket);

router.get("/:cid/finishpurchase/",passportCall("jwt"),getTicketByEmail);

router.post("/:cid/product/:pid", passportCall("jwt"),  updateCart);

router.put('/:cid/',passportCall("jwt"),emptyCart);

router.delete('/:cid/',passportCall("jwt"),deleteCart);



//agregar producto al carrito, si ya existe lo incrementa quantity en 1, sino lo agrega
// router.post("/:cid/product/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;

//     const cartData = await cartsManager.getById(cartId);
//     if (!cartData) {
//       res.status(404).json({ error: "Carrito no encontrado" });
//       return;
//     }

//     const existingProduct = await cartsManager.isProductInCart(cartId,productId);
//     if (existingProduct) {
//       // incrementar la cantidad
//       await cartsManager.incrementProductQuantity(cartId, productId);
//     } else {
//       //  agregar el producto con cantidad 1
//       await cartsManager.addProductToCart(cartId, productId);
//     }

//     res.json({
//       message: "Operación realizada correctamente",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error en la operación",
//       error: error,
//     });
//   }
// });

//eliminar un producto del carrito
//  router.delete('/:cartId/:productId', (req, res) => {
//     const cartId = req.params.cartId;
//     const productId = req.params.productId;

//     try {
//        const success = cartsManager.removeFromCart(cartId, productId);

//       if (success) {
//         res.status(200).json({ message: 'Producto eliminado del carrito' });
//       } else {
//         res.status(404).json({ message: 'Producto no encontrado' });
//       }
//     } catch (err) {
//       res.status(500).json({ message: 'Error al eliminar un producto del carrito', error: err });
//     }
//   });

// //  agregar un arreglo de productos al carrito
// router.put('/:cid/', async (req, res) => {
//   const cartId = req.params.cid;
//   const productsToAdd = req.body.products;
//    try {
//     const cart = await cartsManager.getById(cartId);

//     if (!cart) {
//       return res.status(404).json({ message: 'Carito no encontrado' });
//     }
//     cart.products = cart.products.concat(productsToAdd);
//     await cart.save();

//     res.status(200).json({ message: 'Productos agregados al carrito', cart: cart });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al agregar productos al carrito', error: error });
//   }
// });

// //eliminar todos los productos del carrito
// router.delete('/:cid/', async (req, res) => {
//   const cartId = req.params.cid;
//   try {
//     const cart = await cartsManager.getById(cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Carrito no encontrado' });

//     }
//     cart.products = [];
//     await cart.save();

//     res.status(200).json({ message: 'Todos los productos del carrito fueron eliminados', cart: cart });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al eliminar todos los productos del carrito', error: error });
//   }
// });

//  //actualizar solo la cantidad de un producto en el carrito
//  router.put('/:cid/updatequantity/:productId', async (req, res) => {
//   const cartId = req.params.cid;
//   const productId = req.params.productId;
//   const newQuantity = req.body.quantity; // Nueva cantidad de ejemplares

//   try {
//     const cart = await cartsManager.getById(cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//      // Buscar el producto en el carrito por su ID y lo actualiza
//     const productToUpdate = await cartsManager.findProductInCartAndUpdateQuantity(cartId, productId, newQuantity);
//      // Guardar los cambios en la base de datos
//     await cart.save();

//     res.status(200).json({ message: 'Cantidad actualizada', cart: cart });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar la cantidad', error: error });
//   }
// });

export default router;
