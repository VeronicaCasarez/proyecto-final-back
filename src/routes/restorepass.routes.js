import { Router } from "express";
import userModel from '../dao/models/user.model.js';
import { enviarCorreoRecuperacion } from "../services/mailing.js";
import notifier from 'node-notifier';

const router = Router();

router.get("", (req, res) => {
  res.render("restore", {
    title: "Restaurar tu contrasena?",
  });
});


router.post("/", async (req, res) => {
    const emailAddress = req.body.email; 
    // Envía el correo de recuperación
    const recoveryLink = `http://localhost:8080/forgot`;
    enviarCorreoRecuperacion(emailAddress,recoveryLink);
    notifier.notify({
      title: 'Correo enviado',
      message: 'Se envio un correo a tu casilla de email',
      timeout: 1000,
    });
    res.json({ success: true, message: "Correo de recuperación enviado" });
  });
  

  export default router;