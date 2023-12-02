export default class CartRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createCart = (cart) => {
      return this.dao.save(cart);
    };
    getAllCarts = () => {
      return this.dao.getAll();
    };
    getCartById = (cid) => {
      return this.dao.getById(cid);
    };
    addProductToCart  = (cid, pid) => {
      return this.dao.addProduct(cid, pid);
    };
    isProductInCart = (cid, pid) => {
      return this.dao.isThere(cid, pid);
    };
    incrementProductQuantity  = (cid, pid) => {
      return this.dao.incrementQuantity(cid, pid);
    };
    removeProductFromCart = (cid, data) => {
      return this.dao.removeProduct(cid, data);
    };
    removeAllProductsFromCart = (cid) => {
      return this.dao.removeAllProducts(cid);
    };
    deleteCart = (cid) => {
      return this.dao.delete(cid);
    };
  }