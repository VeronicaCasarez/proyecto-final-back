import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { updateCartErrorInfo } from "../services/info.js";
import { cartService } from "../repositories/services.js";
import { productService } from "../repositories/services.js";
import { ticketService } from "../repositories/services.js";
import notifier from "node-notifier";

//CREAR CARRITO////**** */
const saveCart = async (req, res) => {
  const cart = req.body;
  try{ 
    await cartService.createCart(cart);
    res.send(cart);
  }catch(error){
    res.status(500).json({message:"Error al crear el carrito"});
  }
};

//OBTENER TODOS LOS CARRITOS///*** NO LA USO */
const getAllCarts = async (req, res) => {
  const carts = await cartService.getAllCarts();
  res.render("cart", { carts: carts });
};

//OBTENER EL CARRITO POR ID//**** */
const getCartById = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cartById = await cartService.getCartById(cid);
    if (!cartById) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    cartById._id = cartById._id.toString();
    let newCart = {
      _id: cartById._id,
      products: cartById.products.map((product) => {
        return {
          _id: product.product._id,
          name: product.product.name,
          description: product.product.description,
          price: product.product.price,
          category: product.product.category,
          availability: product.product.availability,
          quantity: product.quantity,
        };
      }),
      total: cartById.total,
    };
    // Verificar si el carrito está vacío
    const isEmptyCart = newCart.products.length === 0  ? false : true;
   
    res.render("cart", { 
      cart: newCart,
      isEmptyCart
    });
  } catch (error) {
    console.error("Error al obtener el carrito por ID:", error);
    res.status(500).json({ message: "Error al obtener el carrito por ID" });
  }
};


//ACTUALIZAR CARRITO AGREGAR UN PRODUCTO////**** */
const updateCart = async (req, res) => {
  const cid = req.user.user.user.cart;
  const pid = req.params.pid;
  const role = req.user.user.user.role;
  const email = req.user.user.user.email;
 
  try {
    const product = await productService.getProductById(pid);
  
    if (role === 'premium' && product.owner === email) {
      notifier.notify({
        title: 'Denegada',
        message: 'No puedes agregar tu propio producto al carrito'
      });
      return res.status(403).json({message:'No puedes agregar tu propio producto al carrito'});
      
    } else if (role === 'admin' ) { 
      notifier.notify({
        title: 'Denegada',
        message: 'No tienes permiso para agregar productos al carrito'
      });
      return res.status(403).json({message:'No tienes permiso para agregar productos al carrito'});

    } else {
      const productInCart = await cartService.isProductInCart(cid, pid);
      
      if (productInCart) {
        notifier.notify({
          title: 'Exito',
          message: 'Producto agregado al carrito'
        });
        await cartService.incrementProductQuantity(cid, pid);
        return res.status(200).json({message:'Producto agregado al carrito'});
        
      } else {
        notifier.notify({
          title: 'Exito',
          message: 'Producto agregado al carrito'
        });
        cartService.addProductToCart(cid, pid);
        return res.status(200).json({message:'Producto agregado al carrito'});
      }
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    return res.status(500).json({message:'Error al agregar producto al carrito'});
  }
};


//GENERAR TICKET///*** */
const generatedTicket = async (req, res) => {
  const user = req.user;
  const cid = req.params.cid;
  const cart = await cartService.getCartById(cid);
  const randomCode = getRandomInt(1000, 9999);

  const newTicket = {
    code: randomCode,
    purchase_datetime: new Date(),
    amount: cart.total,
    purchaser: user.user.user.email,
  };
  const ticket = ticketService.createTicket(newTicket);

  const productsNotPurchased = [];

  for (const item of cart.products) {
    const productId = item.product;
    const quantity = item.quantity;

    const product = await productService.getProductById(productId);

    if (!product) {
      productsNotPurchased.push({
        productId,
        reason: "Producto no encontrado",
      });
      continue;
    }

    if (product.availability < quantity) {
      productsNotPurchased.push({
        productId,
        reason: "Disponibilidad insuficiente",
      });
      continue;
    }

    product.availability -= quantity;
    await productService.updateProduct(productId,product);
    await cartService.removeProductFromCart(cid, product.id);
  }
  res.send(ticket);
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO///*** */
const emptyCart = async (req,res) => {
  const cid=req.params.cid;
   try {
    const existingCart = await cartService.getCartById(cid);

    if (!existingCart) {
      return res.status(500).json({message:'Error no se encontro el carrito'});
    }
    await cartService.removeAllProductsFromCart(cid);
    return  res.status(200).json({message:'Productos eliminados del carrito'});;
  } catch (error) {
    return res.status(500).json({message:'No se pudieron eliminar los productos del carrito'});
  }
};

//ELIMINAR CARRITO///*** */
const deleteCart = async (req,res) => {
  const cid=req.params.cid;
   try {
    console.log("aca de nuevo",cid)
    const existingCart = await cartService.getCartById(cid);

    if (!existingCart) {
      throw new Error("Carrito no encontrado");
    }
    await cartService.deleteCart(cid);
  } catch (error) {
    console.error("Error al eliminar el carrito", error);
    throw error;
  }
};

export { saveCart, getAllCarts, getCartById, updateCart, generatedTicket,emptyCart, deleteCart };


