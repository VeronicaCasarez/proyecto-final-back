import { cartService, userService } from "../repositories/services.js";
import {generateToken} from "../utils.js";
import { __dirname } from "../utils.js";
import notifier from 'node-notifier';

//REGISTARSE 
const signup = async (req,res)=>{
  res.render("signup", {
  title: "Crea tu cuenta",
});
};

//LOGEARSE
const sessionLogin = async (req, res) => {
   const { username, password } = req.body;
  try {
     const user = await userService.getDataUserByEmail(username );
    if (!user) {
      notifier.notify({
        title: 'Acceso denegado',
        message: 'Registrese para ingresar',
        timeout: 1000,
      });
      return res.json({ status: "error", message: "User not found" });
    } else {
      const cart = [];
      const newCart = await cartService.createCart({ products: cart });
      user.last_connection = new Date();
      user.cart = newCart._id;
      await userService.updateIdCartInUser(user);

      const myToken = generateToken({ user, cart });
      res.cookie("CoderKeyQueNadieDebeSaber", myToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      }).json({ status: "success", respuesta: "Autenticado exitosamente",token:myToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error al iniciar sesión" });
  }
};

//RENDERIZA EL FORMULARIO PARA LOGIN
const login = async (req,res)=>{
    res.render("login", {
      title: "Inicia sesion",
    });
};
  

//OLVIDO DE CONTRASEÑA
const forgotPassword = async(req, res) => {
  res.render("forgot", {
    title: "Olvidaste tu contrasena?",
  });
};

//CERRAR SESION
const logoutSession = async (req, res) => {
  try {
    const cartId = req.user.user.user.cart;
    const user = req.user;

    user.last_connection = new Date();
    await userService.updateUser();

    // Eliminar el carrito de compras
    await cartService.deleteCart(cartId);

    // Destruir la sesión
    req.session.destroy(err => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).json({ respuesta: "Error en el servidor" });
      } else {
        // Limpiar el token y cerrar sesión
        res.clearCookie("CoderKeyQueNadieDebeSaber");
        res.redirect("/");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error al cerrar sesión" });
  }
};


export {signup,login,sessionLogin,forgotPassword,logoutSession};
