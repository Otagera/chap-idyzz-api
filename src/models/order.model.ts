import mongoose, { Schema } from "mongoose";
import { Order } from "../interfaces";

const orderSchema = new Schema<Order>({
  products: {
    type: [{ productId: String, quantity: Number }],
    required: true,
  },
  amount: { type: Number, required: true },
  paymentRef: { type: String, required: true },
  status: { type: Boolean, default: false },
});

mongoose.model<Order>("Order", orderSchema);
