import userModel  from "../models/user.model.js"

export default class Users {
    constructor() {
        console.log(`Working users with Database persistence in mongodb`)
    }
    save = async (user) => {
        let result = await userModel.create(user);
        return result;
    }
    getAll= async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject())
    }
    getById = async(uid) =>{
        let result = await userModel.findById({_id:uid});
        return result;
    };

    getByEmail = async (email) => {
        try {
          const user = await userModel.findOne({ email: email });
          if (user) {
            return user._id; 
          } else {
            return null; 
          }
        } catch (error) {
          throw error; 
        }
      };
      
      update = async (uid, newRole) => {
        try {
          const result = await userModel.findByIdAndUpdate(uid, { role: newRole });
          return result;
        } catch (error) {
          throw error;
        }
      };

      upAvatar = async(uid, imagePath)=> {
        try {
          const user = await userModel.findById(uid);
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
          user.profileImage = imagePath;
          const updatedUser = await userModel.save();
          return updatedUser;
        } catch (error) {
          throw new Error('Error al actualizar la imagen de perfil del usuario');
        }
      }
      
}