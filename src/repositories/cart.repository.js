export default class CartRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createCart = (cart) => {
      return this.dao.create(cart);
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
    increaseQuantity  = (cid, pid) => {
      return this.dao.increase(cid, pid);
    };
    decreaseQuantity  = (cid, pid) => {
      return this.dao.decrease(cid, pid);
    };
    removeOneProductInCart = (cid, data) => {
      return this.dao.removeOneProduct(cid, data);
    };
    removeAllProductsInCart = (cid) => {
      return this.dao.removeAllProducts(cid);
    };
    deleteCart = (cid) => {
      return this.dao.delete(cid);
    };
  }