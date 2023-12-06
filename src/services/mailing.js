import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { userService } from '../repositories/services.js';

dotenv.config();

// Configuración de Mailtrap
const transporter = nodemailer.createTransport({
  service:process.env.MAILING_SERVICE,
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILING_USER,
    pass: process.env.MAILING_PASSWORD
  }
});


// Función para enviar correo electrónico por inactividad
async function sendEmail(emailAddress) {
  const mailOptions = {
    from: 'casaresveronica54@gmail.com',
    to: emailAddress,
    subject: 'Eliminación de cuenta por inactividad',
    text: 'Tu cuenta ha sido eliminada debido a la inactividad durante un período de tiempo.'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${emailAddress}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

// FUNCION PARA ENVIAR CORREO ELECTRONICO CUANDO SE ELIMINA UN PRODUCTO AL USUARIO PREMIUM
async function sendEmailToPremium(emailAddress) {

  const mailOptions = {
    from: 'casaresveronica54@gmail.com',
    to: emailAddress,
    subject: 'Eliminación de producto',
    text: 'Se ha eliminado un producto que creaste.'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${emailAddress}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

// FUNCION PARA ELIMINAR USUARIOS INACTIVOS
async function deleteInactiveUsers() {
  const limiteInactividad = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // Últimos 10 días

 //const limiteInactividad = new Date(Date.now() - 30 * 60 * 1000); // Últimos 30 minutos
  try {
    const usuarios = await userService.getAllUsers(); 
 
    const usuariosInactivos = usuarios.filter(
      user =>
        (user.last_connection < limiteInactividad) && (user.role === 'user' || user.role === 'premium')
    );
    if (usuariosInactivos){ 
    for (const usuario of usuariosInactivos) {
      await sendEmail(usuario.email); 
      await userService.deleteUser(usuario._id);
      console.log(`Correo enviado y usuario ${usuario.email} eliminado por inactividad`);
    }
  }else{
    res.json({message:"No hay usuarios inactivos"})

  }

  } catch (error) {
    res.json({message:'Error al encontrar usuarios inactivos:', error});
    
  }
}

// Llamar a la función para eliminar usuarios inactivos y enviar correos
deleteInactiveUsers().catch((error) => {
  console.error('Error al eliminar usuarios inactivos:', error);
});


//FUNCION PARA ENVIAR CORREO DE RECUPERACION
const enviarCorreoRecuperacion = (emailAddress, recoveryLink) => {
  const mailOptions = {
    from: 'casaresveronica54@gmail.com',
    to: emailAddress,
    subject: 'Recuperación de contraseña',
    text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryLink}`
    
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

export{
  deleteInactiveUsers,
  sendEmailToPremium,
  enviarCorreoRecuperacion
};