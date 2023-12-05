import { ticketService } from "../repositories/services.js";

/////CREAR TICKET///******* */
const saveTicket = async (req, res) => {
    const ticket = req.body;
    const user = req.user;
    await ticketService.createTicket(user);
    res.json(ticket);
  };
  
  /////OBTENER TODOS LOS  TICKETS////NO LA USO
  const getAllTickets = async (req, res) => {
    const tickets = await ticketService.getAllTickets();
    res.send(tickets);
    // res.render('user', { user: users })
  };

  /////OBTENER  TICKET POR ID ///NO LA USO
  const getTicketById = async (req, res) => {
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);
    ticket._id = ticket._id.toString();
    res.render('finish-purchase', ticket);
  };
  
  /////OBTENER  TICKET POR EMAIL DE USUARIO //***** */
  const getTicketByEmail = async (req, res) => {
    const userEmail = req.user.user.user.email;
    const ticket = await ticketService.getTicketByEmail(userEmail);
    ticket._id = ticket._id.toString();
    console.log(ticket);
    res.render('finish-purchase', ticket);
  };
  
export {saveTicket,getAllTickets,getTicketById,getTicketByEmail}