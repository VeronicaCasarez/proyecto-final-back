import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { generateProductErrorInfo } from "../services/info.js";
import { productService } from "../repositories/services.js";

//CREAR PRODUCTO
const saveProduct = async (req, res) => {
  try {
    const productData = req.body;
    const user = req.user; 

    if (!productData || !productData.name || !productData.description || !productData.price || !productData.category || !productData.availability) {
      throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
    }
 console.log("en el conttoler",user)
    // Establece el campo 'owner' del producto
    productData.owner = user.user.user.email;

    await productService.createProduct(productData);
    res.send(productData);
  } catch (error) {
    if (error instanceof CustomError) {
      const errorInfo = generateProductErrorInfo(error);
      res.status(errorInfo.statusCode).json(errorInfo);
    } else {
      console.error("Error no controlado:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};


// const saveProduct = async (req, res) => {
//     try {
//       const product = req.body;
//       if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
//         throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
//       }
  
//       await productService.createProduct(product);
//       res.send(product);
//     } catch (error) {
//       if (error instanceof CustomError) {
//         const errorInfo = generateProductErrorInfo(error);
//         res.status(errorInfo.statusCode).json(errorInfo);
//       } else {
//         console.error("Error no controlado:", error);
//         res.status(500).json({ message: "Error interno del servidor." });
//       }
//     }
//   };
  
  ////OBTENER TODOS LOS PRODUCTOS////*** */
  const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    const user = req.user;
    const cartId = req.user.user.user.cart;
    const userRole = user.user.user.role;
    const showEditButton = userRole === 'admin' || userRole === 'premium' ? true : false;
    res.render('product', { products: products, user: user, cartId: cartId, showEditButton });
  };
  
////OBTENER UN PRODUCTO////*** */
  const getProductById = async (req, res) => {
    const pid = req.params.pid;
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
    res.render('productdetail', productById);
  };

////OBTENER TODOS LOS PRODUCTOS, LOS MUESTRA AL ADMIN////*** */
  const getAllProductsForAdmin = async (req, res) => {
    const user=req.user; 
    const products = await productService.getAllProducts();
    res.render('updateproducts', { products: products,user:user });
  };
  
////OBTENER UN PRODUCTO, LOS MUESTRA AL ADMIN////*** */
  const getProductByIdForAdmin = async (req, res) => {
    const pid = req.params.pid;
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
  
    res.render('updateoneproduct', { productById });
  };
  
  ////ACTUALIZA UN PRODUCTO////
  const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const productToUpdated = req.body;
    const productUpdated = await productService.updateProduct(pid, productToUpdated);
    console.log(productToUpdated);
    res.send(productUpdated);
  };
  
  ////ELIMINA UN PRODUCTO////**** */
  // const deleteProduct = async (req, res) => {
  //   const { pid } = req.params;
  //   const productId = await productService.deleteProduct(pid);
  //   res.send(productId);
  // };
  const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const { user } = req;
  console.log(user)
    // Verifica que el usuario sea premium
    if (user && user.role === 'premium') {
        
      // Verifica si el usuario es el propietario del producto
      if (product && product.owner === user.email) {
        const productId = await productService.deleteProduct(pid);
        res.send(productId);
      } else {
        res.status(403).send('No tienes permiso para eliminar este producto.');
      }
    } else {
      res.status(403).send('Solo los usuarios premium pueden eliminar productos.');
    }
  };
  
 
export {saveProduct,getAllProducts,getProductById, deleteProduct,updateProduct,getAllProductsForAdmin,getProductByIdForAdmin}