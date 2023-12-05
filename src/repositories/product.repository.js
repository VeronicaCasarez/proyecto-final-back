export default class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createProduct = (product) => {
      return this.dao.create(product);
    };
    getAllProducts = () => {
      return this.dao.getAll();
    };
    getAllProductsForPagination = (page,perPage)=>{
      return this.dao.getPagination(page, perPage);
    };
    getProductById = (pid) => {
      return this.dao.getById(pid);
    };
    updateProduct = (pid, product) => {
      return this.dao.update(pid, product);
    };
    uploadImageProduct = (pid, imagePath) => {
      return this.dao.upImage(pid, imagePath);
    };
    deleteProduct = (pid) => {
      return this.dao.delete(pid);
    };
  }