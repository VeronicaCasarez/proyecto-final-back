import { Router } from "express";
import { passportCall } from "../utils.js";
import {
  createCart,
  getCartById,
  updateCart,
  generatedTicket,
  deleteOneProductInCart,
  emptyCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  deleteCart
} from "../controller/cart.controller.js";
import {
  getTicketByEmail,
} from "../controller/ticket.controller.js";


const router = Router();


router.post("/", passportCall("jwt"), createCart);

router.put("/:cid/:pid",passportCall("jwt"),deleteOneProductInCart);//elimina un producto del carrito

router.get("/:cid", passportCall("jwt"),  getCartById);

router.put('/:cid/:pid/decrease', passportCall("jwt"), decreaseProductQuantity);

router.put('/:cid/:pid/increase',passportCall("jwt"), increaseProductQuantity);

router.post("/:cid/purchase/", passportCall("jwt"),  generatedTicket);

router.get("/:cid/finishpurchase/",passportCall("jwt"),getTicketByEmail);

router.post("/:cid/product/:pid", passportCall("jwt"),  updateCart);//agrega producto al carrito

router.put('/:cid/',passportCall("jwt"),emptyCart);//vacia el carrito

router.delete('/:cid/',passportCall("jwt"),deleteCart); //elimina el carrito


export default router;
