import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { generateProductErrorInfo } from "../services/info.js";
import { productService,userService } from "../repositories/services.js";
import { uploadProductImage } from '../config/multer.config.js';
import notifier from "node-notifier";
import { sendEmailToPremium } from "../services/mailing.js";
import products from "../dao/models/product.model.js";
import mongoose from "mongoose";
import productsModel from "../dao/models/product.model.js";



//CREAR PRODUCTO
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const user = req.user; 
      if (!productData || !productData.name || !productData.description || !productData.price || !productData.category || !productData.availability) {
      throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
    }
    productData.owner = user.user.user.email;

    await productService.createProduct(productData);
    res.send(productData);
  } catch (error) {

      console.error("Error no controlado:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    
  }
};

  
  ////OBTENER TODOS LOS PRODUCTOS////*** */
  const getAllProducts = async (req, res) => {
    //const products = await productService.getAllProducts();
    const userId= req.user.user.user._id;
    const profile= await userService.getUserById(userId);
    const showAvatar =profile.profileImage;
    const user = req.user;
    const cartId = req.user.user.user.cart;
    const userRole = user.user.user.role;
    const showEditProduct = userRole === 'admin' || userRole === 'premium' ? true : false;
    const showChangeRole = userRole === 'admin'  ? true : false;
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto la primera
    const perPage = 6; // Número de productos por página
    const totalProducts = await productsModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    
    const products = await productsModel.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.render('home', {
      products:products,
      user: user, cartId: cartId, showEditProduct,showAvatar,showChangeRole,
      pagination: {
        currentPage: page,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink: page > 1 ? `/productos?page=${page - 1}` : null,
        nextLink: page < totalPages ? `/productos?page=${page + 1}` : null
      }
    });
   
  };
  
////OBTENER UN PRODUCTO////*** */
  const getProductById = async (req, res) => {
    const pid = req.params.pid;
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
    res.render('product-detail', productById);
  };

////OBTENER TODOS LOS PRODUCTOS, LOS MUESTRA AL ADMIN////*** */
  const getAllProductsForAdmin = async (req, res) => {
    const user=req.user; 
    const products = await productService.getAllProducts();
    res.render('update-products', { products: products,user:user });
  };
  
////OBTENER UN PRODUCTO, LOS MUESTRA AL ADMIN////*** */
  const getProductByIdForAdmin = async (req, res) => {
    const pid = req.params.pid;
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
    res.render('update-one-product', productById );
  };
  
  ////ACTUALIZA UN PRODUCTO////
  const updateProduct = async (req, res) => {
    const  pid  = req.params.pid;
    const productToUpdated = req.body;
    const productUpdated = await productService.updateProduct(pid, productToUpdated);
    notifier.notify({
      title: 'Exito',
      message: 'Producto actualizado',
    });
    res.send(productUpdated);
  };
  
  //GUARDAR LA IMAGEN DE UN PRODUCTO
const uploadImageProduct = async (req, res) => {
  try {
    const productId = req.params.pid; 
    const imagePath = req.file.path;
    await productService.uploadImageProduct(productId,imagePath);
       
    notifier.notify({
      title: 'Imagen del producto',
      message: 'Tu imagen fue agregada al prodcuto',
    });
       res.redirect(303, `/api/updateproducts`);
  } catch (error) {
    
    res.status(500).json({ error: 'Error interno del servidor al subir la imagen de producto' });
  }
   
};

  ////ELIMINA UN PRODUCTO////**** */
  const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const { user } = req;
    try {
      const product = await productService.getProductById(pid);
  
      if (user.user.user.role === 'admin' || (user.user.user.role === 'premium' && product.owner === user.user.user.email)) {
        const productDeleted = await productService.deleteProduct(pid);

        if (user.user.user.role === 'admin' && product.owner !== user.user.user.email) {
          await sendEmailToPremium(product.owner); 
          console.log(`Correo enviado a ${product.owner} sobre la eliminación del producto.`);
        }
  
        notifier.notify({
          title: 'Exito',
          message: 'Producto eliminado.'
        });
  
        res.send(productDeleted);
      } else {
        notifier.notify({
          title: 'Permiso denegado',
          message: 'No tienes permiso para eliminar este producto.'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor.');
    }
  };
  
  
  
 
export {createProduct,getAllProducts,getProductById, deleteProduct,updateProduct,getAllProductsForAdmin,getProductByIdForAdmin,uploadImageProduct}