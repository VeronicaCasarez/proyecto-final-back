import cartModel from "../models/cart.model.js";
import mongoose from "mongoose";

export default class CartDao {
  constructor() {
    console.log(`Working with Database persistence in mongodb`);
  }
  //CREAR CARRITO**
  save = async (data) => {
    const newCart = await cartModel.create(data);
    return newCart;
  };
  //OBTENER TODOS LOS CARRITOS
  getAll = async () => {
    return await cartModel.find({}).lean();
  };
  //OBTENER CARRITO POR ID
  getById = async (cid) => {
    let result = await cartModel.findById({ _id: cid });
    return result;
  };

  //AGREGAR UN PRODUCTO AL CARRITO
  addProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const productExists = cart.products.some(
        (p) => String(p.product) === pid
      );

      if (!productExists) {
        const newProduct = { product: pid, quantity: 1 };
        cart.products.push(newProduct);
        const updatedCart = await cart.save();

        if (!updatedCart) {
          console.log("Carrito no encontrado");
          return null;
        }

        console.log("Carrito actualizado", updatedCart);
        return updatedCart;
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      throw error;
    }
  };

  //VERIFICAR SI UN PRODUCTO ESTA EN EL CARRITO
  isThere = async (cartId, productId) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      if (cart) {
        const productInCart = cart.products.some(
          ({ product }) => String(product._id) === productId
        );
        if (productInCart) {
          return productInCart;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al buscar producto en el carrito:", error);
      throw error;
    }
  };
  //INCREMENTAR LA CANTIDAD EN UNO MAS SI EL PRODUCTO ESTA EN EL CARRITO
  incrementQuantity = async (cid, pid) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const productIndex = cart.products.findIndex(
        (p) => String(p.product._id) === pid
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
        const updatedCart = await cart.save();

        if (!updatedCart) {
          console.log("Carrito no encontrado");
          return null;
        }

        console.log("Carrito actualizado", updatedCart);
        return updatedCart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (error) {
      console.error("Error al incrementar la cantidad del producto", error);
      throw error;
    }
  };
  //ELIMINAR PRODUCTO DEL CARRITO
  removeProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const updatedProducts = cart.products.filter(
        (p) => String(p.product._id) !== pid
      );
      cart.products = updatedProducts;
      const updatedCart = await cart.save();
      if (!updatedCart) {
        console.log("Carrito no encontrado");
        return null;
      }
      console.log("Carrito actualizado", updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Error al eliminar producto del carrito", error);
      throw error;
    }
  };

  //ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
  removeAllProducts = async (cid) => {
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
          return console.error("Error al incrementar la cantidad del producto", error);
    
        }
        cart.products = [];
        await cart.save();
    
        return  cart;
      } catch (error) {
        console.error("Error al incrementar la cantidad del producto", error);
      
        throw error;
      }
  };

  //ELIMINAR CARRITO**
  delete = async (cid) => {
    const deletedCart = await cartModel.findByIdAndDelete(cid);
    return deletedCart;
  };

  //BUSCAR UN PRODUCTO EN EL CARRITO Y ACTUALIZAR EN VARIOS
  findProductInCartAndUpdateQuantity = async (cid, pid, newQuantity) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const productIndex = cart.products.findIndex(
        (p) => String(p.product._id) === pid
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = newQuantity;
        const updatedCart = await cart.save();

        if (!updatedCart) {
          console.log("Carrito no encontrado");
          return null;
        }

        console.log("Carrito actualizado");
        return updatedCart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (error) {
      console.error("Error al incrementar la cantidad del producto", error);
      throw error;
    }
  };
}
