import productsModel from '../models/product.model.js';

export default class ProductDao {
  constructor() {
    console.log(`Working users with Database persistence in mongodb`)
}

//CREAR UN PRODUCTO
  create = async (product) => {
    try{
      const newProduct = await productsModel.create(product);
      return newProduct;
    }catch (error) {
      throw new Error("Error al crear el producto: " + error.message);
    }
  };

//OBTENER TODOS LOS PRODUCTOS
  getAll = async () => {
    try{
      let products = await productsModel.find({}).lean();
      return products;  
    }catch (error) {
      throw new Error("Error al obtener todos los productos: " + error.message);
    }
  };

  //OBTENER PAGINACION
  getPagination = async (page, perPage)=> {
    try {
      const totalProducts = await productsModel.countDocuments();
      const totalPages = Math.ceil(totalProducts / perPage);
  
      const products = await productsModel.find().lean()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
  
      return { products, totalPages };
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
    }
};
 

  //OBTENER PRODUCTO POR ID
  getById = async (pid) => {
    try{
      let productId = await productsModel.findById(pid);
      return productId;
    }catch (error) {
      throw new Error("Error al obtener el producto: " + error.message);
    }
  };

  //ACTUALIZAR UN PRODUCTO
  update = async (pid, product) => {
    try{
      const updatedProduct = await productsModel.findByIdAndUpdate(pid, product, { new: true });
      return updatedProduct;
    }catch (error) {
      throw new Error("Error al actualizzar el producto: " + error.message);
    }
  };

  //SUBIR FOTO DE PRODUCTO
  upImage= async (pid, imagePath) => {
    try {
      const product = await productsModel.findById(pid);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      product.productImage = imagePath;
      await product.save();
  
      return { message: 'Ruta de la imagen actualizada correctamente en la base de datos' };
    }catch (error) {
      throw new Error("Error al subir imagen: " + error.message);
    }
  };

  //ELIMINAR UN PRODUCTO
  delete = async (pid) => {
    try{
      const deletedProduct = await productsModel.findByIdAndDelete(pid);
      return deletedProduct;
    }catch (error) {
      throw new Error("Error al eliminar el prodcuto: " + error.message);
    }
  };

}
