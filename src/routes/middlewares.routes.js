import { __dirname } from "../utils.js";

 

// Middleware de autorización para administradores
export function isAdmin(req, res, next) {

  if (req.user && req.user.user.user.role == 'admin') {
    next(); // El usuario es administrador, permitir acceso
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

// Middleware de autorización para usuarios premium
export function isPremium(req, res, next) {
  if (req.user && req.user.user.user.role == 'premium') {
    next(); // El usuario es premium, permitir acceso
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

// Middleware de autorización para usuarios
export function isUser(req, res, next) {

  if (req.user && req.user.user.user.role == 'user') {
    next(); // El usuario es un usuario regular, permitir acceso
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}



