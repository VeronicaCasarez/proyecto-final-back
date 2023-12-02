import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from 'bcrypt';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
import {faker} from '@faker-js/faker';



const PRIVATE_KEY = "CoderKeyQueNadieDebeSaber";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "2h" });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).json({ error: "Error de autenticacion" });

  // const token = authHeader.split(" ")[1];

  jwt.verify(authHeader, PRIVATE_KEY, (err, user) => {
    if (err) res.status(401).json({ error: "Token invalido" });

    req.user = user;
    next();
  });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error); // Manejar errores de autenticación
      }
      
      if (!user) {
        if (info && info.message) {
          return res.status(401).json({ status: "error", message: info.message });
        } else {
          return res.status(401).json({ status: "error", message: "No autorizado" });
        }
      }

      req.user = user; // Asignar el usuario a req.user
      next();
    })(req, res, next);
  };
};


export const authorization = ()=>{
    return async(req,res,next)=>{
      if (req.session.user && req.session.user.role.admin)  {
         return next();
      }else return res.status(403).json("error de autenticacion");
    }
}
//logica para hashear la contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  //logica para comparar la contraseña sin hashear con la que esta en la base de datos
  //devuelve true o false
export const isValidPassword = (savedPassword, password) => {
  console.log({ "cloud password": savedPassword, loginPassword: password });
  return bcrypt.compareSync(password, savedPassword);
};


// Función para generar un producto de mocking
export const generateProductMocks=() =>{
  return {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }),
    category: faker.commerce.department(),
    availability: faker.datatype.number({ min: 0, max: 100 }),
  };
}
