export default class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createTicket = (ticket) => {
      return this.dao.create(ticket);
    };
    getAllTickets = () => {
      return this.dao.getAll();
    };
    getTicketById = (tid) => {
      return this.dao.getById(tid);
    };
    getTicketByEmail = (tid) => {
      return this.dao.getByEmail(tid);
    };
    updateTicket = (tid, ticket) => {
      return this.dao.update(tid, ticket);
    };
    deleteTicket = (tid) => {
      return this.dao.delete(tid);
    };
  }