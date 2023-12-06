import { Router } from "express";
import {ticketService} from "../repositories/services.js";
import PaymentService from "../services/payment.service.js";

const router = Router();


router.post("/payment-intents", async (req, res) => {
 const tid = req.params.tid;

 const ticket = ticketService.getTicketById(tid);
 console.log (ticket)
  if (!ticket)
    return res.status(404).json({ message: "ticket not found" });

  const paymentIntentInfo = {
    amount: ticket.amount,
    currency: "usd",
    description: ticket.code,
    payment_method_types: ["card"],
    metadata: {
     // name: productRequested.name,
      //useId: "este seria un correlativo de mongo",
      orderDetails: JSON.stringify({
        amount: ticket.amount,
        description: ticket.code,
        //product: productRequested.name,
        //price: productRequested.price,
        //quantity: 23,
      }),
    //   address: JSON.stringify({
    //     street: "calle falsa 123",
    //     city: "Springfield",
    //     state: "Springfield",
    //     postal_code: "12345",
    //     country: "US",
    //   }),

      amount: ticket.price,
    },
  };

  const service = new PaymentService();
  let result = await service.createPaymentIntent(paymentIntentInfo);
  console.log(result);
  res.send({ status: "success", payload: result });
});

export default router;