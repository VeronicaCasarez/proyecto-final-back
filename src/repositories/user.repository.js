export default class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createUser = (user) => {
      return this.dao.create(user);
    };
    getAllUsers = () => {
      return this.dao.getAll();
    };
    getUserById = (uid) => {
      return this.dao.getById(uid);
    };
    getUserIdByEmail = (email) => {
      return this.dao.getByEmail(email);
    };
    getDataUserByEmail = (email) => {
      return this.dao.getDataByEmail(email);
    };
    updateIdCartInUser = (user)=>{
      return this.dao.updateIdCart(user)
    }
    updateUser = (uid, newRole) => {
      return this.dao.update(uid, newRole);
    };
    uploadProfileUser = (uid, imagePath) => {
      return this.dao.upAvatar(uid, imagePath);
    };
    uploadDocument = (uid,documentType,filePath)=>{
      return this.dao.upDocument(uid,documentType,filePath)
    }
    getAvatar = (uid) => {
      return this.dao.avatar(uid);
    };
    deleteUser = (uid) => {
      return this.dao.delete(uid);
    };
  }