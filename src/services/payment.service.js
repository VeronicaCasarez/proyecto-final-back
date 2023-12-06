import Stripe from "stripe";
import * as dotenv from "dotenv";
import { __dirname } from "../utils.js";

dotenv.config();

const stripePrivateKey = process.env.STRIPE_PRIVATE_KEY;
export default class PaymentService {
  constructor() {
    this.stripe = new Stripe(stripePrivateKey);
  }

  createPaymentIntent = async (data) => {
    const paymentIntent = await this.stripe.paymentIntents.create(data);
    return paymentIntent;
  };
}